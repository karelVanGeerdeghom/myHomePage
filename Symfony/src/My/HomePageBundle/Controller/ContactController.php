<?php

namespace My\HomePageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class ContactController extends Controller
{
    public function indexAction()
    {
        return $this->render('MyHomePageBundle:Contact:index.html.twig');
    }
}
