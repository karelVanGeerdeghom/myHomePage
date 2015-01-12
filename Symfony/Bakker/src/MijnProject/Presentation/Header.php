<!DOCTYPE HTML>
<html>
<head>
<meta charset="utf-8">
<link rel="stylesheet" href="bootstrap/css/bootstrap.min.css">
<script src="http://code.jquery.com/jquery.js"></script>
<script src="bootstrap/js/bootstrap.min.js"></script>
<link rel="stylesheet" href="css/style.css">
<title>Bakkerij</title>
</head>
<body>
<!--start login-->
<header>
    {% if login != 'login' %}
        <div class="container">
            <form method="get" class="navbar-form navbar-right" action="login.php">
                <div class="form-group">
                    <label for="email" class="sr-only">email</label>
                    <input type="text" class="form-control" name="email" id="email" placeholder="email" value="{{ email }}">
                </div>
                <div class="form-group">
                    <label for="password" class="sr-only">wachtwoord</label>
                    <input type="password" class="form-control" name="password" id="password" placeholder="wachtwoord">
                </div>
                <div class="form-group">
                    <input type="submit" class="btn btn-default" value="aanmelden">
                    <input type="text" name="location" value="{{ location }}" hidden="hidden">
                </div>
            </form>
        </div>
    {% endif %} 
    {% if login == 'login' %}
        <div class="container">
            <form method="get" class="navbar-form navbar-right" action="logout.php">
                <div class="form-group">
                    <label>Welkom, {{ naam }}! </label>
                    <input type="submit" class="btn btn-default" value="afmelden">
                </div>
            </form>
        </div>
    {% endif %} 
</header>
<!--einde login-->
<!--hoofdmenu-->
<section>
    <div class="container">
        <nav class="navbar navbar-default" role="navigation">
            <div class="navbar-header">
                <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#hoofdmenu">
                    <span class="sr-only">Toggle Navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    {% if login != 'login' %}
                        <span class="icon-bar"></span>
                    {% endif %} 
                    {% if login == 'login' %}
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                    {% endif %} 
                </button>
            </div>
            <div class="collapse navbar-collapse" id="hoofdmenu">
                <ul class="nav nav-pills">
                    <li class="{{ a }}"><a href="index.php">Welkom</a></li>
                    <li class="{{ b }}"><a href="aanbod.php">Aanbod</a></li>
                    <li class="{{ c }}"><a href="gastenboek.php">Gastenboek</a></li>
                    {% if login != 'login' %}
                        <li class="{{ d }}"><a href="register.php">Registreer</a></li>
                    {% endif %} 
                    {% if login == 'login' %}
                        <li class="{{ e }}"><a href="cart.php">Mandje</a></li>
                        <li class="{{ f }}"><a href="overview.php">Overzicht</a></li>
                    {% endif %} 
                </ul>
            </div>
        </nav>
    </div>
</section>
<!--einde hoofdmenu-->