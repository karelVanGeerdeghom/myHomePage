<?php
use MijnProject\Business\TypeService;
use Doctrine\Common\ClassLoader;
require_once 'Doctrine/Common/ClassLoader.php';
$classLoader = new ClassLoader('MijnProject', 'src');
$classLoader->register();

if (isset($_GET['id'])) {
    TypeService::schakelType($_GET['id'], $_GET['actief']);
}
header("location:typetoonalle.php");
exit(0);