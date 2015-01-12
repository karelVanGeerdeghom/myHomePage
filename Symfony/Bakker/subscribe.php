<?php
use MijnProject\Business\KlantService;
use MijnProject\Business\PostcodeService;
use MijnProject\Exceptions\EmailBestaatException;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

require_once 'libraries/Twig/Autoloader.php';
Twig_Autoloader::register();

$fileLoader = new Twig_Loader_Filesystem('src/MijnProject/Presentation');
$twig = new Twig_Environment($fileLoader);

if (isset($_GET['action']) && $_GET['action'] == "add") {
    try {
        KlantService::voegKlantToe($_POST['email'], '123456', $_POST['naam'], $_POST['voornaam'], $_POST['adres'], $_POST['post'], '1');
        header("location:register.php?error=success");
        exit(0);
    } catch (EmailBestaatException $ebe) {
        header("location:register.php?error=emailexists");
        exit(0);
    } 
}
?>