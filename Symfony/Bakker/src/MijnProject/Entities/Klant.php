<?php
namespace MijnProject\Entities;
class Klant {
    private static $nrMap = array();
    
    private $nr;
    private $email;
    private $pass;
    private $naam;
    private $voornaam;
    private $adres;
    private $postid;
    private $actief;
    private $bestellingen;
    private $totaal;
    
    private function __construct($nr, $email, $pass, $naam, $voornaam, $adres, $postid, $actief, $bestellingen, $totaal) {
        $this->nr           = $nr;
        $this->email        = $email;
        $this->pass         = $pass;
        $this->naam         = $naam;
        $this->voornaam     = $voornaam;
        $this->adres        = $adres;
        $this->postid       = $postid;
        $this->actief       = $actief;
        $this->bestellingen = $bestellingen;
        $this->totaal       = $totaal;
    }
 
    public static function add($nr, $email, $pass, $naam, $voornaam, $adres, $postid, $actief, $bestellingen, $totaal) {
        if (!isset(self::$nrMap[$nr])) {
            self::$nrMap[$nr] = new Klant($nr, $email, $pass, $naam, $voornaam, $adres, $postid, $actief, $bestellingen, $totaal);
        }
        return self::$nrMap[$nr];
    }
    
    public function getNr()             { return $this->nr; }    
    public function getEmail()          { return $this->email; }
    public function getPass()           { return $this->pass; }
    public function getNaam()           { return $this->naam; }  
    public function getVoornaam()       { return $this->voornaam; }    
    public function getAdres()          { return $this->adres; }  
    public function getPostid()         { return $this->postid; }  
    public function getActief()         { return $this->actief; }
    public function getBestellingen()   { return $this->bestellingen; }  
    public function getTotaal()         { return $this->totaal; }
    
    public function setNr($nr)                      {  $this->nr = $nr; }
    public function setEmail($email)                {  $this->email = $email; }
    public function setPass($pass)                  {  $this->pass = $pass; }
    public function setNaam($naam)                  {  $this->naam = $naam; }
    public function setVoornaam($voornaam)          {  $this->voornaam = $voornaam; }
    public function setAdres($adres)                {  $this->adres = $adres; }
    public function setPostid($postid)              {  $this->postid = $postid; }
    public function setActief($actief)              {  $this->actief = $actief; }
    public function setBestellingen($bestellingen)  { $this->bestellingen = $bestellingen; }  
    public function setTotaal($totaal)              { $this->totaal = $totaal; }
}