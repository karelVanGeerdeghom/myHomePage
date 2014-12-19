<?php

namespace My\HomePageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class AdminController extends Controller
{
    public function indexAction()
    {
        return $this->render('MyHomePageBundle:Admin:index.html.twig');
    }
}
