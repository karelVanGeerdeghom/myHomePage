<?php
namespace MijnProject\Business;
use MijnProject\Data\CartDAO;

class CartService {
    public static function voegItemToe($cart, $productid, $aantal, $prijs) {
        return CartDAO::addItem($cart, $productid, $aantal, $prijs);
    }

    public static function verwijderItem($cart, $productid) {
        return CartDAO::delItem($cart, $productid);
    }

    public static function totaalPrijs($cart) {
        return CartDAO::getPrice($cart);
    }
    
    public static function bevestigBestelling($cart, $dagen, $klantnr, $totaal) {
        CartDAO::confirmOrder($cart, $dagen, $klantnr, $totaal);
    }
}