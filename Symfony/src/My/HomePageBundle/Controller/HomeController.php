<?php

namespace My\HomePageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class HomeController extends Controller
{
    public function indexAction()
    {
        return $this->render('MyHomePageBundle:Home:index.html.twig');
    }
}
