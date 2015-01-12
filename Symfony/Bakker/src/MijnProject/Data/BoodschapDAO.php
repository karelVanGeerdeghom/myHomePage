<?php
namespace MijnProject\Data;
use MijnProject\Entities\Klant;
use MijnProject\Entities\Boodschap;
use PDO;
class BoodschapDAO {
    public static function getAll() {
        $lijst = array();
        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT gastenboek.klantnr as klantnr, email, pass, naam, voornaam, adres, postid, klanten.actief as klantactief, bestellingen, totaal, boodschapid, boodschap, datum, gastenboek.actief as gastactief FROM klanten, gastenboek WHERE klanten.klantnr = gastenboek.klantnr ORDER BY datum DESC";
        $result = $dbh->query($query);
        foreach ($result as $row) {
            $klant = Klant::add($row["klantnr"], $row["email"], $row["pass"], $row["naam"], $row["voornaam"], $row["adres"], $row["postid"], $row["klantactief"], $row["bestellingen"], $row["totaal"]);
            $boodschap = Boodschap::add($row["boodschapid"], $klant, $row["boodschap"], $row["datum"], $row["gastactief"]);
            array_push($lijst, $boodschap);
        }
        $dbh = null;
        return $lijst;
    }
  
    public static function add($klantnr, $boodschap) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "INSERT INTO gastenboek (klantnr, boodschap, datum, actief) VALUES ('".$klantnr."', '".$boodschap."', NOW(), 1)";
        $result = $dbh->exec($query);
        $dbh = null;
    }
    
    public static function set($id, $actief) {
        switch ($actief) {
            case 0: $set = 1; break;
            case 1: $set = 0; break;
        }
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE gastenboek SET actief='".$set."' WHERE boodschapid = '".$id."'";
        $result = $dbh->exec($query);
        $dbh = null;
    }
}