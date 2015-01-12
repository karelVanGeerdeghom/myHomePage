<?php
use MijnProject\Business\CartService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();
session_start();

$cart = $_SESSION['cart'];
$productid = $_POST['prodid'];
$aantal = $_POST['aantal'];
$prijs = $_POST['prijs'];

$goto = $_POST['goto'];

$_SESSION['cart'] = CartService::voegItemToe($cart, $productid, $aantal, $prijs);

header("location:aanbod.php?action=add&id=".$productid."#".$goto);
exit(0);  
