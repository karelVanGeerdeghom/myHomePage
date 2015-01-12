<?php
namespace MijnProject\Data;
use MijnProject\Entities\Product;
use MijnProject\Entities\Type;
use MijnProject\Entities\Bonregel;
use PDO;
class BonregelDAO { 
    public static function getAll($nr) {
        $lijst = array();
        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT bonregels.productid as productid, aantal, bonregels.prijs as prijs ";
        $query .= ", producten.omschrijving as proddesc, producten.typeid as typeid, producten.actief as prodactief ";
        $query .= ", types.omschrijving as typedesc, types.actief as typeactief ";
        $query .= "FROM bonregels, producten, types WHERE bestelbonnr='".$nr."' AND bonregels.productid=producten.productid AND types.typeid=producten.typeid";
        $result = $dbh->query($query);
        foreach ($result as $row) {
            $type = Type::add($row["typeid"], $row["typedesc"], $row["typeactief"]);
            $product = Product::add($row["productid"], $type, $row["proddesc"], $row["prijs"], $row["prodactief"]);
            $totaal = $row['aantal'] * $row['prijs'];
            $bonregel = Bonregel::add($nr, $product, $row['aantal'], $row['prijs'], $totaal);
            array_push($lijst, $bonregel);
        }
        $dbh = null;
        return $lijst;
    }
}