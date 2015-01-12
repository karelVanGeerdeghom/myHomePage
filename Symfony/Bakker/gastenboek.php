<?php
use MijnProject\Entities\Klant;
use MijnProject\Business\KlantService;
use MijnProject\Business\BoodschapService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();
$boodschaplijst = BoodschapService::toonAlleBoodschappen();

require_once 'libraries/Twig/Autoloader.php';
Twig_Autoloader::register();

session_start();
$login = "";
$naam = "";
if (isset($_SESSION['login'])) {
    $login = $_SESSION['login'];
    $cart = $_SESSION['cart'];
    $klant = $_SESSION['klant'];
    $user = KlantService::toonKlant($klant);
    $naam = $user->getVoornaam() . ' ' . $user->getNaam();
}

$email = "";
if (isset($_COOKIE['email'])) {
    $email = $_COOKIE['email'];
}

$fileLoader = new Twig_Loader_Filesystem('src/MijnProject/Presentation');
$twig = new Twig_Environment($fileLoader);
print $twig->render('Header.php', array('login' => $login, 'email' => $email, 'location' => 'gastenboek', 'naam' => $naam, 'a' => '', 'b' => '', 'c' => 'active', 'd' => '', 'e' => '', 'f' => ''));
print $twig->render('Gastenboek.php', array ('login' => $login, 'boodschaplijst' => $boodschaplijst));
print $twig->render('Footer.php');
?>