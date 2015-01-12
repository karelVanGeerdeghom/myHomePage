<?php
namespace MijnProject\Entities;
class CartItem { 
    private $productid;
    private $product;
    private $aantal;
    private $prijs;
    
    private function __construct($productid, $product, $aantal, $prijs) {
        $this->productid      = $productid;
        $this->product        = $product;
        $this->aantal         = $aantal;
        $this->prijs          = $prijs;
    }

    public static function add($productid, $product, $aantal, $prijs) {
        return new CartItem($productid, $product, $aantal, $prijs);
    }
    
    public function getProductid()      { return $this->productid; }
    public function getProduct()        { return $this->product; }
    public function getAantal()         { return $this->aantal; } 
    public function getPrijs()          { return $this->prijs; }  
    
    public function setProductid($productid)   { $this->productid = $productid; }
    public function setProduct($product)       { $this->product = $product; }
    public function setAantal($aantal)         { $this->aantal = $aantal; }
    public function setPrijs($prijs)           { $this->prijs = $prijs; }
}