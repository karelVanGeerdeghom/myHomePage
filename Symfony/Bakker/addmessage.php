<?php
use MijnProject\Business\BoodschapService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();
session_start();

$boodschap = $_POST['message'];
$klantnr = $_SESSION['klant'];

BoodschapService::voegBoodschapToe($klantnr, $boodschap);

header("location:gastenboek.php");
exit(0);  
