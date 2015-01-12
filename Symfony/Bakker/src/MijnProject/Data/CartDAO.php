<?php
namespace MijnProject\Data;
use MijnProject\Entities\Type;
use MijnProject\Entities\Product;
use MijnProject\Entities\CartItem;
use PDO;
class CartDAO {
    public static function addItem($cart, $productid, $aantal, $prijs) {
        $set = 0;
        for ($i = 0; $i < count($cart); $i++) {
            if ($cart[$i]->getProductid() == $productid) {
                $totaal = $aantal + $cart[$i]->getAantal();
                $cart[$i]->setAantal($totaal);
                $set = 1;
            }
        } 
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT producten.omschrijving as proddesc, producten.typeid as typeid, producten.actief as prodactief, prijs ";
        $query .= ", types.omschrijving as typedesc, types.actief as typeactief ";
        $query .= "FROM producten, types WHERE types.typeid=producten.typeid AND productid=".$productid;
        $result = $dbh->query($query);
        foreach ($result as $row) {
            $type = Type::add($row["typeid"], $row["typedesc"], $row["typeactief"]);
            $product = Product::add($productid, $type, $row["proddesc"], $row["prijs"], $row["prodactief"]);
            $item = CartItem::add($productid, $product, $aantal, $prijs);
            if ($set == 0) { array_push($cart, $item); }
        }
        $dbh = null;
        return $cart;
    }

    public static function delItem($cart, $productid) {
        for ($i = 0; $i < count($cart); $i++) {
            if ($cart[$i]->getProductid() == $productid) {
                array_splice($cart, $i, 1);
            }
        }
        return $cart;
    }

    public static function getPrice($cart) {
        $totaal = 0;
        for ($i = 0; $i < count($cart); $i++) {
            $totaal += $cart[$i]->getProduct()->getPrijs() * $cart[$i]->getAantal();
        }
        return $totaal;
    }

    public static function confirmOrder($cart, $dagen, $klantnr, $totaal) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "INSERT INTO bestelbons (klantnr, besteldatum, afhaaldatum) VALUES ('".$klantnr."', NOW(), NOW() + INTERVAL '".$dagen."' DAY)";
        $result = $dbh->exec($query);
        $bonid = $dbh->lastInsertId();
        $query = "SELECT bestellingen, totaal FROM klanten WHERE klantnr=".$klantnr;
        $result = $dbh->query($query);
        $row = $result->fetch();
        $bestellingen = $row['bestellingen'] + 1;
        $subtotaal = $row['totaal'] + $totaal;
        if ($bestellingen == 10) { 
            $bestellingen = 0;
            $subtotaal = 0;
        }
        $query = "UPDATE klanten SET bestellingen = '".$bestellingen."', totaal = '".$subtotaal."' WHERE klantnr=".$klantnr;
        $result = $dbh->exec($query);
        for ($i = 0; $i < count($cart); $i++) {
            $query = "INSERT INTO bonregels (bestelbonnr, productid, aantal, prijs) VALUES ('".$bonid."', '".$cart[$i]->getProductid()."', '".$cart[$i]->getAantal()."','".$cart[$i]->getPrijs()."')";
            $result = $dbh->exec($query);
        } 
        $dbh = null;
    }
}