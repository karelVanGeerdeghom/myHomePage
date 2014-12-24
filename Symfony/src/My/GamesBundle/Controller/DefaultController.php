<?php

namespace My\GamesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller {
    public function indexAction() {
        return $this->render('MyGamesBundle:Default:index.html.twig');
    }
}
