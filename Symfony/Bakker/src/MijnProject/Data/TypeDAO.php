<?php
namespace MijnProject\Data;
use MijnProject\Entities\Type;
use MijnProject\Exceptions\TypeBestaatException;
use PDO;
class TypeDAO {
    public static function getAll() {
        $lijst = array();
        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS); 
        $query = "SELECT typeid, omschrijving, actief FROM types ORDER BY omschrijving";
        $result = $dbh->query($query);
        foreach ($result as $row) {
            $type = Type::add($row["typeid"], $row["omschrijving"], $row["actief"]);
            array_push($lijst, $type);
        }
        $dbh = null;
        return $lijst;
    }
    
    public static function getById($id) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS); 
        $query = "SELECT omschrijving, actief FROM types WHERE typeid = ".$id;
        $result = $dbh->query($query);
        $row = $result->fetch();
        $type = Type::add($id, $row['omschrijving'], $row['actief']);
        $dbh = null;
        return $type;
    }
    
    public static function getByDesc($omschrijving) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT typeid, omschrijving, actief FROM types WHERE omschrijving = '".$omschrijving."'";
        $result = $dbh->query($query);
        $row = $result->fetch();
        if (!$row) {
            return null;
        }
        else {
            $type = Type::add($row['typeid'], $row['omschrijving'], $row['actief']);
            $dbh = null;
            return $type;
        }
    }    
    
    public static function add($omschrijving) {
        $bestaandType = self::getByDesc($omschrijving);
        if (isset($bestaandType)) throw new TypeBestaatException();        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "INSERT INTO types (omschrijving) VALUES ('".$omschrijving."')";
        $result = $dbh->exec($query);
        $dbh = null;
    }
    
    public static function edit($id, $omschrijving) {
        $bestaandType = self::getByDesc($omschrijving);
        if (isset($bestaandType)) throw new TypeBestaatException();        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE types SET omschrijving = '".$omschrijving."' WHERE typeid = '".$id."'";
        $result = $dbh->exec($query);
        $dbh = null;
    }

    public static function set($id, $actief) {
        switch ($actief) {
            case 0: $set = 1; break;
            case 1: $set = 0; break;
        }
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE types SET actief='".$set."' WHERE typeid = '".$id."'";
        $result = $dbh->exec($query);
        $dbh = null;
    }
}