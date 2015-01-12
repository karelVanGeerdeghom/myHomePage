<?php
namespace MijnProject\Entities;
class Type {
    private static $idMap = array();
    
    private $id;
    private $omschrijving;
    private $actief;
    
    private function __construct($id, $omschrijving, $actief) {
        $this->id               = $id;
        $this->omschrijving     = $omschrijving;
        $this->actief           = $actief;
    }
    
    public static function add($id, $omschrijving, $actief) {
        if (!isset(self::$idMap[$id])) {
            self::$idMap[$id] = new Type($id, $omschrijving, $actief);
        }
        return self::$idMap[$id];
    }
    
    public function getId()               { return $this->id; }
    public function getOmschrijving()     { return $this->omschrijving; }
    public function getActief()           { return $this->actief; }
    
    public function setOmschrijving($omschrijving)  { $this->omschrijving = $omschrijving; } 
    public function setActief($actief)              { $this->actief = $actief; }     
}