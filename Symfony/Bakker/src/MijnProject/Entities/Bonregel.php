<?php
namespace MijnProject\Entities;
class Bonregel { 
    private $nr;
    private $product;
    private $aantal;
    private $prijs;
    private $totaal;
    
    private function __construct($nr, $product, $aantal, $prijs, $totaal) {
        $this->nr             = $nr;
        $this->product        = $product;
        $this->aantal         = $aantal;
        $this->prijs          = $prijs;
        $this->totaal         = $totaal;
    }

    public static function add($nr, $product, $aantal, $prijs, $totaal) {
        return new Bonregel($nr, $product, $aantal, $prijs, $totaal);
    }
    
    public function getNr()         { return $this->nr; }
    public function getProduct()    { return $this->product; }
    public function getAantal()     { return $this->aantal; }   
    public function getPrijs()      { return $this->prijs; }    
    public function getTotaal()     { return $this->totaal; }    
    
    public function setNr($nr)              { $this->nr = $nr; }
    public function setProduct($product)    { $this->product = $product; }
    public function setAantal($aantal)      { $this->aantal = $aantal; }   
    public function setPrijs($prijs)        { $this->prijs = $prijs; }   
    public function setTotaal($totaal)      { $this->totaal = $totaal; }   
}