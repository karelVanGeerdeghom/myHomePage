<?php
namespace MijnProject\Data;
use MijnProject\Entities\Klant;
use MijnProject\Entities\Postcode;
use MijnProject\Entities\Bonregel;
use MijnProject\Entities\Bestelbon;
use PDO;
class BestelbonDAO { 
    public static function getAll() {
        $lijst = array();
        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT bestelbons.bestelbonnr as bestelbonnr, bestelbons.klantnr as klantnr, besteldatum, afhaaldatum, afgehaald, bestelbons.actief as bactief";
        $query .= ", email, pass, naam, voornaam, adres, klanten.postid as postid, klanten.actief as kactief, bestellingen, totaal";
        $query .= ", postcode, gemeente";
        $query .= " FROM bestelbons, klanten, postcodes";
        $query .= " WHERE bestelbons.klantnr = klanten.klantnr AND klanten.postid = postcodes.postid";
        $result = $dbh->query($query);
        foreach ($result as $row) {
            $postcode = Postcode::add($row["postid"], $row["postcode"], $row["gemeente"]);
            $klant = Klant::add($row["klantnr"], $row["email"], $row["pass"], $row["naam"], $row["voornaam"], $row["adres"], $postcode, $row["kactief"], $row["bestellingen"], $row["totaal"]);
            $totaal = 0;
            $subquery = "SELECT productid, aantal, prijs FROM bonregels WHERE bestelbonnr=".$row['bestelbonnr'];
            $subresult = $dbh->query($subquery);
            foreach ($subresult as $subrow) {
                $totaal += $subrow['aantal'] * $subrow['prijs'];
            }
            $bestelbon = Bestelbon::add($row['bestelbonnr'], $klant, $row['besteldatum'], $row['afhaaldatum'], $row['afgehaald'], $row['bactief'], $totaal);
            
            array_push($lijst, $bestelbon);
        }
        $dbh = null;
        return $lijst;
    }

    public static function cancel($nr, $actief) {
        switch ($actief) {
            case 0: $set = 1; break;
            case 1: $set = 0; break;
        }
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE bestelbons SET actief='".$set."' WHERE bestelbonnr = '".$nr."'";
        $result = $dbh->exec($query);
        $dbh = null;
    }

    public static function collect($nr, $afgehaald) {
        switch ($afgehaald) {
            case 0: $set = 1; break;
            case 1: $set = 0; break;
        }
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE bestelbons SET afgehaald='".$set."' WHERE bestelbonnr = '".$nr."'";
        $result = $dbh->exec($query);
        $dbh = null;
    }
}