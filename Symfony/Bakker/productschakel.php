<?php
use MijnProject\Business\ProductService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

if (isset($_GET['id'])) {
    ProductService::schakelProduct($_GET['id'], $_GET['actief']);
}
header("location:producttoonalle.php");
exit(0);
?>