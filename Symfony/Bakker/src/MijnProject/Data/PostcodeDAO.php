<?php
namespace MijnProject\Data;
use MijnProject\Entities\Postcode;
use PDO;
class PostcodeDAO {
    public static function getAll() {
        $lijst = array();
        
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT postid, postcode, gemeente FROM postcodes ORDER BY postcode";
        $result = $dbh->query($query);
        foreach ($result as $row) {
            $postcode = Postcode::add($row["postid"], $row["postcode"], $row["gemeente"]);
            array_push($lijst, $postcode);
        }
        $dbh = null;
        return $lijst;
    }

    public static function getById($postid) {
        $dbh = new PDO(DBConfig::$DB_CONNSTRING, DBConfig::$DB_USER, DBConfig::$DB_PASS);
        $query = "SELECT  postcode, gemeente FROM postcodes WHERE postid = '".$postid."'";
        $result = $dbh->query($query);
        $row = $result->fetch();
        if (!$row) {
            return null;
        }
        else {
            $postcode = Product::add($postid, $row["postcode"], $row["gemeente"]);
            $dbh = null;
            return $postcode;
        }
    }
}