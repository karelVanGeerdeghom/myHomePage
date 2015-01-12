<?php
use MijnProject\Business\KlantService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

if (isset($_GET['nr'])) {
    KlantService::schakelKlant($_GET['nr'], $_GET['actief']);
} 
header("location:klanttoonalle.php");
exit(0);
?>