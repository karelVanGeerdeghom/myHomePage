<?php
namespace MijnProject\Entities;
class Boodschap {
    private static $idMap = array();
    
    private $id;
    private $klantnr;
    private $boodschap;
    private $datum;
    private $actief;
    
    private function __construct($id, $klantnr, $boodschap, $datum, $actief) {
        $this->id           = $id;
        $this->klantnr      = $klantnr;
        $this->boodschap    = $boodschap;
        $this->datum        = $datum;
        $this->actief       = $actief;
    }
 
    public static function add($id, $klantnr, $boodschap, $datum, $actief) {
        if (!isset(self::$idMap[$id])) {
            self::$idMap[$id] = new Boodschap($id, $klantnr, $boodschap, $datum, $actief);
        }
        return self::$idMap[$id];
    }
    
    public function getId()              { return $this->id; }    
    public function getKlantnr()         { return $this->klantnr; }
    public function getBoodschap()       { return $this->boodschap; }
    public function getDatum()           { return $this->datum; }    
    public function getActief()          { return $this->actief; }
    
    public function setId($id)                { $this->id = $id; }
    public function setKlantnr($klantnr)      { $this->klantnr = $klantnr; }
    public function setBoodschap($boodschap)  { $this->boodschap = $boodschap; }
    public function setDatum($datum)          { $this->datum = $datum; }
    public function setActief($actief)        { $this->actief = $actief; }
}