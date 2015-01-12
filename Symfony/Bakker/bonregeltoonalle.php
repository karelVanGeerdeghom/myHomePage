<?php
use MijnProject\Business\BonregelService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();
$bonnr = $_GET['nr'];
$bonregellijst = BonregelService::toonAlleRegels($bonnr);

require_once 'libraries/Twig/Autoloader.php';
Twig_Autoloader::register();

$fileLoader = new Twig_Loader_Filesystem('src/MijnProject/Presentation');
$twig = new Twig_Environment($fileLoader);
print $twig->render('BonregelLijst.php', array ('bonregellijst' => $bonregellijst));
?>