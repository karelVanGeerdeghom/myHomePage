<?php
namespace MijnProject\Business;
use MijnProject\Data\PostcodeDAO;

class PostcodeService {
    public static function toonAllePostcodes() {
        $lijst = PostcodeDAO::getAll();
        return $lijst;
    }
}