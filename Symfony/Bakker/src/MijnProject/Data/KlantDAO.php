<?php
namespace MijnProject\Data;
use MijnProject\Entities\Klant;
use MijnProject\Entities\Postcode;
use MijnProject\Exceptions\EmailBestaatException;
use PDO;
class KlantDAO {
    public static function getAll() {
        $lijst = array();
        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT klantnr, email, pass, naam, voornaam, adres, klanten.postid as postid, actief, postcode, gemeente, bestellingen, totaal FROM klanten, postcodes WHERE klanten.postid = postcodes.postid";
        $result = $dbh->query($query);
        foreach ($result as $row) {
            $postcode = Postcode::add($row["postid"], $row["postcode"], $row["gemeente"]);
            $klant = Klant::add($row["klantnr"], $row["email"], $row["pass"], $row["naam"], $row["voornaam"], $row["adres"], $postcode, $row["actief"], $row["bestellingen"], $row["totaal"]);
            array_push($lijst, $klant);
        }
        $dbh = null;
        return $lijst;
    }

    public static function getByNr($nr) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS); 
        $query = "SELECT klantnr, email, pass, naam, voornaam, adres, klanten.postid as postid, actief, postcode, gemeente, bestellingen, totaal FROM klanten, postcodes WHERE klanten.postid = postcodes.postid AND klantnr = ".$nr;
         $result = $dbh->query($query);
        $row = $result->fetch();
        $postcode = Postcode::add($row["postid"], $row["postcode"], $row["gemeente"]);
        $klant = Klant::add($row["klantnr"], $row["email"], $row["pass"], $row["naam"], $row["voornaam"], $row["adres"], $postcode, $row["actief"], $row["bestellingen"], $row["totaal"]);
        $dbh = null;
        return $klant;
    }
    
    public static function getByEmail($email) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT klantnr, email, pass, naam, voornaam, adres, postid, actief, bestellingen, totaal FROM klanten WHERE email = '".$email."'";
        $result = $dbh->query($query);
        $row = $result->fetch();
        if (!$row) {
            return null;
        }
        else {
            $klant = Klant::add($row["klantnr"], $row["email"], $row["pass"], $row["naam"], $row["voornaam"], $row["adres"], $row["postid"], $row["actief"], $row["bestellingen"], $row["totaal"]);
            $dbh = null;
            return $klant;
        }
    }
    
    public static function add($email, $pass, $naam, $voornaam, $adres, $postid, $actief) {
        $bestaandEmail = self::getByEmail($email);
        if (isset($bestaandEmail)) throw new EmailBestaatException();
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "INSERT INTO klanten (email, pass, naam, voornaam, adres, postid, actief) VALUES ('".$email."', '".$pass."', '".$naam."', '".$voornaam."', '".$adres."', '".$postid."', '".$actief."')";
        $result = $dbh->exec($query);
        $dbh = null;
    }

    public static function edit($nr, $email, $pass, $naam, $voornaam, $adres, $postid) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE klanten SET email = '".$email."', pass = '".$pass."', naam = '".$naam."', voornaam = '".$voornaam."', adres = '".$adres."', postid = '".$postid."' WHERE klantnr = ".$nr;
        $result = $dbh->exec($query);
        $dbh = null;
    }
    
    public static function set($nr, $actief) {
        switch ($actief) {
            case 0: $set = 1; break;
            case 1: $set = 0; break;
        }
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE klanten SET actief='".$set."' WHERE klantnr = '".$nr."'";
        $result = $dbh->exec($query);
        $dbh = null;
    }
}