<?php
use MijnProject\Business\BestelbonService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

if (isset($_GET['nr'])) {
    BestelbonService::actiefBestelbon($_GET['nr'], $_GET['actief']);
} 
header("location:bestelbontoonalle.php");
exit(0);
?>