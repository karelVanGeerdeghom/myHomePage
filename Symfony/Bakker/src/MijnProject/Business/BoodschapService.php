<?php
namespace MijnProject\Business;
use MijnProject\Data\BoodschapDAO;

class BoodschapService {
    public static function toonAlleBoodschappen() {
        $lijst = BoodschapDAO::getAll();
        return $lijst;
    }
    
    public static function voegBoodschapToe($klantnr, $boodschap) {
        BoodschapDAO::add($klantnr, $boodschap);
    }
    
    public static function schakelBoodschap($id, $actief) {
        BoodschapDAO::set($id, $actief);
    }    
}