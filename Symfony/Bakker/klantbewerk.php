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

if (isset($_GET['action']) && $_GET['action'] == "edit") {
    try {
        KlantService::bewerkKlant($_POST['nr'], $_POST['email'], $_POST['pass'], $_POST['naam'], $_POST['voornaam'], $_POST['adres'], $_POST['postid']);
        header("location:klanttoonalle.php");
        exit(0);
    } catch (EmailBestaatException $ebe) {
        header("location:klantvoegtoe.php?error=emailexists");
        exit(0);
    } 
} 
else {
    $postcodelijst = PostcodeService::toonAllePostcodes();
    $klant = KlantService::toonKlant($_GET['nr']);
    $error = "";
    if (isset($_GET['error'])) { $error = $_GET['error']; }
    print $twig->render('KlantForm.php', array('postcodelijst' => $postcodelijst, 'error' => $error, 'action' => 'klantbewerk.php?action=edit', 'klant' => $klant));
}
?>