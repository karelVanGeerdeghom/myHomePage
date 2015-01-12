<?php
use Doctrine\Common\ClassLoader;
use MijnProject\Business\PostcodeService;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

require_once 'libraries/Twig/Autoloader.php';
Twig_Autoloader::register();

session_start();
$login = "";
if (isset($_SESSION['login'])) {
    $login = $_SESSION['login'];
}

$email = "";
if (isset($_COOKIE['email'])) {
    $email = $_COOKIE['email'];
}

$error = "";
if (isset($_GET['error'])) {
    $error = $_GET['error'];
}

$postcodelijst = PostcodeService::toonAllePostcodes();
$fileLoader = new Twig_Loader_Filesystem('src/MijnProject/Presentation');
$twig = new Twig_Environment($fileLoader);
print $twig->render('Header.php', array('login' => $login, 'email' => $email, 'location' => 'index', 'a' => '', 'b' => '', 'c' => '', 'd' => 'active', 'e' => '', 'f' => ''));
print $twig->render('Registreer.php', array('postcodelijst' => $postcodelijst, 'error' => $error));
print $twig->render('Footer.php');
?>