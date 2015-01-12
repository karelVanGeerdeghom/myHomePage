<?php
use MijnProject\Business\CartService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();
session_start();

$dagen = $_POST['dagen'];
$totaal = $_POST['totaal'];
$klantnr = $_SESSION['klant'];
$cart = $_SESSION['cart'];

CartService::bevestigBestelling($cart, $dagen, $klantnr, $totaal);

$_SESSION['cart'] = array();

header("location:aanbod.php?order=set");
exit(0);  