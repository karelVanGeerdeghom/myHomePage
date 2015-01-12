<?php
namespace MijnProject\Business;
use MijnProject\Data\TypeDAO;

class TypeService {
    public static function toonAlleTypes() {
        $lijst = TypeDAO::getAll();
        return $lijst;
    }

    public static function toonType($id) {
        $type = TypeDAO::getById($id);
        return $type;
    }
    
    public static function voegTypeToe($omschrijving) {
        TypeDAO::add($omschrijving);
    }

    public static function bewerkType($id, $omschrijving) {
        TypeDAO::edit($id, $omschrijving);
    }
    
    public static function schakelType($id, $actief) {
        TypeDAO::set($id, $actief);
    }
}