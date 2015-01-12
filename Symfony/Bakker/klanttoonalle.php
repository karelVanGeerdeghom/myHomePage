<?php
use MijnProject\Business\KlantService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();
$klantlijst = KlantService::toonAlleKlanten();

require_once 'libraries/Twig/Autoloader.php';
Twig_Autoloader::register();

$fileLoader = new Twig_Loader_Filesystem('src/MijnProject/Presentation');
$twig = new Twig_Environment($fileLoader);
print $twig->render('KlantLijst.php', array ('klantlijst' => $klantlijst));
?>