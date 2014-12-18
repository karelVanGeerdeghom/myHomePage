<?php

namespace My\HomePageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class CvController extends Controller
{
    public function indexAction()
    {
        return $this->render('MyHomePageBundle:Cv:index.html.twig');
    }
}
