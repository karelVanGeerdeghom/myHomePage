<?php
namespace MijnProject\Business;
use MijnProject\Data\BonregelDAO;

class BonregelService {
    public static function toonAlleRegels($nr) {
        $lijst = BonregelDAO::getAll($nr);
        return $lijst;
    }
}