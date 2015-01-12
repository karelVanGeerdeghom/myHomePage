<?php
namespace MijnProject\Entities;
class Bestelbon { 
    private static $nrMap = array();
    
    private $nr;
    private $klant;
    private $besteldatum;
    private $afhaaldatum;
    private $afgehaald;
    private $actief;
    private $totaal;
    
    private function __construct($nr, $klant, $besteldatum, $afhaaldatum, $afgehaald, $actief, $totaal) {
        $this->nr             = $nr;
        $this->klant          = $klant;
        $this->besteldatum    = $besteldatum;
        $this->afhaaldatum    = $afhaaldatum;
        $this->afgehaald      = $afgehaald;
        $this->actief         = $actief;
        $this->totaal         = $totaal;
    }

    public static function add($nr, $klant, $besteldatum, $afhaaldatum, $afgehaald, $actief, $totaal) {
        if (!isset(self::$nrMap[$nr])) {
            self::$nrMap[$nr] = new Bestelbon($nr, $klant, $besteldatum, $afhaaldatum, $afgehaald, $actief, $totaal);
        }
        return self::$nrMap[$nr];
    }
    
    public function getNr()             { return $this->nr; }
    public function getKlant()          { return $this->klant; }
    public function getBesteldatum()    { return $this->besteldatum; }   
    public function getAfhaaldatum()    { return $this->afhaaldatum; }   
    public function getAfgehaald()      { return $this->afgehaald; }   
    public function getActief()         { return $this->actief; } 
    public function getTotaal()         { return $this->totaal; } 
    
    public function setNr($nr)                      { $this->nr = $nr; }
    public function setKlant($klant)                { $this->klant = $klant; }
    public function setBestelatum($besteldatum)     { $this->besteldatum = $besteldatum; }   
    public function setAfhaaldatum($afhaaldatum)    { $this->afhaaldatum = $afhaaldatum; }   
    public function setAfgehaald($afgehaald)        { $this->afgehaald = $afgehaald; }   
    public function setActief($actief)              { $this->actief = $actief; }
    public function setTotaal($totaal)              { $this->totaal = $totaal; }   
}