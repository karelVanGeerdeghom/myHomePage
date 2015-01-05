<?php

namespace My\HomePageBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use My\HomePageBundle\Entity\Site;

class PortfolioController extends Controller
{
    public function indexAction() {
        
        $sites = $this->getDoctrine()
                ->getRepository('MyHomePageBundle:Site')
                ->findAll();
        
        
        return $this->render('MyHomePageBundle:Portfolio:index.html.twig', array('sites' => $sites));
    }
}
