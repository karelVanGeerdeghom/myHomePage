<?php
use MijnProject\Entities\Klant;
use MijnProject\Business\KlantService;
use MijnProject\Business\ProductService;
use MijnProject\Entities\Type;
use MijnProject\Business\TypeService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();
$typelijst = TypeService::toonAlleTypes();
$productlijst = ProductService::toonAlleProducten();

require_once 'libraries/Twig/Autoloader.php';
Twig_Autoloader::register();

session_start();
$login = "";
$klant = "";
$user = "";
$naam = "";
if (isset($_SESSION['login'])) {
    $login = $_SESSION['login'];
    $klant = $_SESSION['klant'];
    $user = KlantService::toonKlant($klant);
    $naam = $user->getVoornaam() . ' ' . $user->getNaam();
}

$email = "";
if (isset($_COOKIE['email'])) {
    $email = $_COOKIE['email'];
}

$action = "";
$productnaam = "";
$typeid = "";
if (isset($_GET['action'])) {
    $action = "add";
    $productnaam = ProductService::toonProduct($_GET['id'])->getOmschrijving();
    $typeid = ProductService::toonProduct($_GET['id'])->getTypeid()->getId();
}

$bestel = "";
if (isset($_GET['order'])) {
    $bestel = "ja";
}

$fileLoader = new Twig_Loader_Filesystem('src/MijnProject/Presentation');
$twig = new Twig_Environment($fileLoader);
print $twig->render('Header.php', array('login' => $login, 'email' => $email, 'location' => 'aanbod', 'naam' => $naam, 'a' => '', 'b' => 'active', 'c' => '', 'd' => '', 'e' => '', 'f' => ''));
print $twig->render('Aanbod.php', array ('typelijst' => $typelijst, 'productlijst' => $productlijst, 'login' => $login, 'klant' => $klant, 'action' => $action, 'productnaam' => $productnaam, 'typeid' => $typeid, 'bestel' => $bestel));
print $twig->render('Footer.php');
?>