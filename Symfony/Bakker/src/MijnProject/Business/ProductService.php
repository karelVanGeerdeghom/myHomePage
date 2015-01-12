<?php
namespace MijnProject\Business;
use MijnProject\Data\ProductDAO;

class ProductService {
    public static function toonAlleProducten() {
        $lijst = ProductDAO::getAll();
        return $lijst;
    }

    public static function toonProduct($id) {
        $product = ProductDAO::getById($id);
        return $product;
    }
    
    public static function voegProductToe($typeid, $omschrijving, $prijs, $actief) {
        ProductDAO::add($typeid, $omschrijving, $prijs, $actief);
    }
    
    public static function bewerkProduct($id, $typeid, $omschrijving, $prijs) {
        ProductDAO::edit($id, $typeid, $omschrijving, $prijs);
    }
    
    public static function schakelProduct($id, $actief) {
        ProductDAO::set($id, $actief);
    }
}