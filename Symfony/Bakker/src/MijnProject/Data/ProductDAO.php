<?php
namespace MijnProject\Data;
use MijnProject\Entities\Product;
use MijnProject\Entities\Type;
use MijnProject\Exceptions\ProductBestaatException;
use PDO;
class ProductDAO {
    public static function getAll() {
        $lijst = array();
        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT productid, producten.typeid as typeid, producten.omschrijving as proddesc, types.omschrijving as typedesc, prijs, producten.actief as prodactief, types.actief as typeactief FROM producten, types WHERE producten.typeid = types.typeid";
        $result = $dbh->query($query);
        foreach ($result as $row) {
            $type = Type::add($row["typeid"], $row["typedesc"], $row["typeactief"]);
            $product = Product::add($row["productid"], $type, $row["proddesc"], $row["prijs"], $row["prodactief"]);
            array_push($lijst, $product);
        }
        $dbh = null;
        return $lijst;
    }

    public static function getById($id) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS); 
        $query = "SELECT productid, producten.typeid as typeid, producten.omschrijving as proddesc, types.omschrijving as typedesc, prijs, producten.actief as prodactief, types.actief as typeactief FROM producten, types WHERE producten.typeid = types.typeid AND productid = ".$id;
        $result = $dbh->query($query);
        $row = $result->fetch();
        $type = Type::add($row["typeid"], $row["typedesc"], $row["typeactief"]);
        $product = Product::add($row["productid"], $type, $row["proddesc"], $row["prijs"], $row["prodactief"]);
        $dbh = null;
        return $product;
    }
    
    public static function getByDesc($omschrijving) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT productid, typeid, omschrijving, prijs, actief FROM producten WHERE omschrijving = '".$omschrijving."'";
        $result = $dbh->query($query);
        $row = $result->fetch();
        if (!$row) {
            return null;
        }
        else {
            $product = Product::add($row['productid'], $row['typeid'], $row['omschrijving'], $row['prijs'], $row['actief']);
            $dbh = null;
            return $product;
        }
    }
    
    public static function add($typeid, $omschrijving, $prijs, $actief) {
        $bestaandProduct = self::getByDesc($omschrijving);
        if (isset($bestaandProduct)) throw new ProductBestaatException();
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "INSERT INTO producten (typeid, omschrijving, prijs, actief) VALUES ('".$typeid."', '".$omschrijving."', '".$prijs."', '".$actief."')";
        $result = $dbh->exec($query);
        $dbh = null;
    }

    public static function edit($id, $typeid, $omschrijving, $prijs) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE producten SET typeid = '".$typeid."', omschrijving = '".$omschrijving."', prijs = '".$prijs."' WHERE productid = ".$id;
        $result = $dbh->exec($query);
        $dbh = null;
    }
    
    public static function set($id, $actief) {
        switch ($actief) {
            case 0: $set = 1; break;
            case 1: $set = 0; break;
        }
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "UPDATE producten SET actief='".$set."' WHERE productid = '".$id."'";
        $result = $dbh->exec($query);
        $dbh = null;
    }
}