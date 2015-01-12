<?php
use MijnProject\Entities\Klant;
use MijnProject\Business\KlantService;
use MijnProject\Business\CartService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

require_once 'libraries/Twig/Autoloader.php';
Twig_Autoloader::register();

session_start();
$login = "";
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

$dagen = $_SESSION['days'];

if (isset($_GET['step'])) {
    $step = $_GET['step'];
}
else { $step = 1; }

$totaal = CartService::totaalPrijs($cart);
$klant = KlantService::toonKlant($klant);

$nota = "";
$korting = "";
if ($klant->getBestellingen() == 9) {
    $nota = "set";
    $korting = round($klant->getTotaal() / 10, 2);
    $totaal = $totaal - $korting;
    if ($totaal < 0) {
        $totaal = 0;
    }
}

$fileLoader = new Twig_Loader_Filesystem('src/MijnProject/Presentation');
$twig = new Twig_Environment($fileLoader);
print $twig->render('Header.php', array('login' => $login, 'email' => $email, 'location' => 'cart', 'naam' => $naam, 'a' => '', 'b' => '', 'c' => '', 'd' => '', 'e' => 'active', 'f' => ''));
print $twig->render('Mandje.php', array('cart' => $cart, 'login' => $login, 'totaal' => $totaal, 'step' => $step, 'dagen' => $dagen, 'nota' => $nota, 'korting' => $korting));
print $twig->render('Footer.php');
?>