<?php
session_start();

$_SESSION['days'] = $_POST['dagen'];

header("location:cart.php?step=2");
exit(0); 