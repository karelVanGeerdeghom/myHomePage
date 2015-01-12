<?php
namespace MijnProject\Entities;
class Product {
    private static $idMap = array();
    
    private $id;
    private $typeid;
    private $omschrijving;
    private $prijs;
    private $actief;
    
    private function __construct($id, $typeid, $omschrijving, $prijs, $actief) {
        $this->id               = $id;
        $this->typeid           = $typeid;
        $this->omschrijving     = $omschrijving;
        $this->prijs            = $prijs;
        $this->actief           = $actief;
    }
 
    public static function add($id, $typeid, $omschrijving, $prijs, $actief) {
        if (!isset(self::$idMap[$id])) {
            self::$idMap[$id] = new Product($id, $typeid, $omschrijving, $prijs, $actief);
        }
        return self::$idMap[$id];
    }
    
    public function getId()             { return $this->id; }    
    public function getTypeid()         { return $this->typeid; }
    public function getOmschrijving()   { return $this->omschrijving; }
    public function getPrijs()          { return $this->prijs; }  
    public function getActief()         { return $this->actief; }    
    
    public function setTypeid($typeid)              { $this->typeid = $typeid; }
    public function setOmschrijving($omschrijving)  { $this->omschrijving = $omschrijving; }
    public function setPrijs($prijs)                { $this->prijs = $prijs; }
    public function setActief($actief)              { $this->actief = $actief; }
}