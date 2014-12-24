<?php

namespace My\GamesBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class MonopolyController extends Controller {
    public function indexAction() {
        return $this->render('MyGamesBundle:Monopoly:index.html.twig');
    }
}
