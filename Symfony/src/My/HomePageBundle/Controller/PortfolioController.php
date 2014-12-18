<?php

namespace My\HomePageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class PortfolioController extends Controller
{
    public function indexAction()
    {
        return $this->render('MyHomePageBundle:Portfolio:index.html.twig');
    }
}
