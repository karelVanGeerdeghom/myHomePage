<?php
use MijnProject\Business\KlantService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

session_start();

if (isset($_GET['location'])) {
    $location = $_GET['location'];
    $email = $_GET['email'];
    if (!isset($_COOKIE['email'])) {
        setcookie('email', $email, time() + 60*60*24*30);
    }
    
    $pass = $_GET['password'];
    
    if ($email == "admin" && $pass="admin") {
        header("location:admin.php");
        exit(0);  
    }
    
    $klant = KlantService::emailKlant($_GET['email']);
    if ($klant) {
        if ($pass == $klant->getPass() && $klant->getActief() == 1) {
            $_SESSION['login'] = "login";
            $_SESSION['klant'] = $klant->getNr();
            $_SESSION['cart'] = array();
            $_SESSION['days'] = "";
        }
    }
    
    header("location:".$location.".php");
    exit(0);    
}