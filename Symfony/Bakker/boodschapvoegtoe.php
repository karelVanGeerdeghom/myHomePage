<?php
use MijnProject\Business\BoodschapService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

require_once 'libraries/Twig/Autoloader.php';
Twig_Autoloader::register();

$fileLoader = new Twig_Loader_Filesystem('src/MijnProject/Presentation');
$twig = new Twig_Environment($fileLoader);

if (isset($_GET['action']) && $_GET['action'] == "add") {
    BoodschapService::voegBoodschapToe($_POST['klantnr'], $_POST['boodschap']);
    header("location:boodschaptoonalle.php");
    exit(0);
} 
else {
    $error = "";
    if (isset($_GET['error'])) { $error = $_GET['error']; }
    print $twig->render('BoodschapForm.php', array('error' => $error, 'action' => 'boodschapvoegtoe.php?action=add'));
}
?>