<?php
use MijnProject\Business\ProductService;
use MijnProject\Business\TypeService;
use MijnProject\Exceptions\ProductBestaatException;
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
        ProductService::bewerkProduct($_POST['id'], $_POST['typeid'], $_POST['omschrijving'], $_POST['prijs']);
        header("location:producttoonalle.php");
        exit(0);
    } catch (ProductBestaatException $pbe) {
        header("location:productbewerk.php?error=productexists&id=".$_POST['id']);
        exit(0);
    } 
} else {
    $typelijst = TypeService::toonAlleTypes();
    $product = ProductService::toonProduct($_GET['id']);
    $error = "";
    if (isset($_GET['error'])) { $error = $_GET['error']; }
    print $twig->render('ProductForm.php', array('typelijst' => $typelijst, 'error' => $error, 'action' => 'productbewerk.php?action=edit', 'product' => $product));
}
?>