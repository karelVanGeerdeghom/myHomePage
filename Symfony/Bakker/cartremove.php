<?php
use MijnProject\Business\CartService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();
session_start();

$cart = $_SESSION['cart'];
$productid = $_POST['id'];

$_SESSION['cart'] = CartService::verwijderItem($cart, $productid);

header("location:cart.php");
exit(0);