<?php
namespace MijnProject\Entities;
class Postcode {
    private static $idMap = array();
    
    private $id;
    private $postcode;
    private $gemeente;
    
    private function __construct($id, $postcode, $gemeente) {
        $this->id               = $id;
        $this->postcode         = $postcode;
        $this->gemeente         = $gemeente;
    }
 
    public static function add($id, $postcode, $gemeente) {
        if (!isset(self::$idMap[$id])) {
            self::$idMap[$id] = new Postcode($id, $postcode, $gemeente);
        }
        return self::$idMap[$id];
    }
    
    public function getId()          { return $this->id; }    
    public function getPostcode()    { return $this->postcode; }
    public function getGemeente()    { return $this->gemeente; }
}