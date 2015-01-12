<?php
use MijnProject\Business\BoodschapService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

if (isset($_GET['id'])) {
    BoodschapService::schakelBoodschap($_GET['id'], $_GET['actief']);
} 
header("location:boodschaptoonalle.php");
exit(0);
?>