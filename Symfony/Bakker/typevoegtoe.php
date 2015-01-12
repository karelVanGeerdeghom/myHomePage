<?php
use MijnProject\Business\TypeService;
use MijnProject\Exceptions\TypeBestaatException;
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
        TypeService::voegTypeToe($_POST['omschrijving']);
        header("location:typetoonalle.php");
        exit(0);
    } catch (TypeBestaatException $tbe) {
        header("location:typevoegtoe.php?error=typeexists");
        exit(0);
    } 
} else {
    $error = "";
    if (isset($_GET['error'])) { $error = $_GET['error']; }
    print $twig->render('TypeForm.php', array('error' => $error, 'action' => 'typevoegtoe.php?action=add'));
}
?>