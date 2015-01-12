<?php
namespace MijnProject\Business;
use MijnProject\Data\BestelbonDAO;

class BestelbonService {
    public static function toonAlleBestelbons() {
        $lijst = BestelbonDAO::getAll();
        return $lijst;
    }
    
    public static function actiefBestelbon($nr, $actief) {
        BestelbonDAO::cancel($nr, $actief);
    }
    
    public static function afhaalBestelbon($nr, $afgehaald) {
        BestelbonDAO::collect($nr, $afgehaald);
    }  
}