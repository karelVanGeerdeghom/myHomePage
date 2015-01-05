<?php

namespace My\HomePageBundle\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use My\HomePageBundle\Entity\Document;
use My\HomePageBundle\Entity\Site;
use Symfony\Component\HttpFoundation\Request;

class AdminController extends Controller {
    public function indexAction() {
        return $this->render('MyHomePageBundle:Admin:index.html.twig');
    }
    
    public function uploadAction(Request $request) {
        $site = new Site();
        
        $form = $this->createFormBuilder($site)
            ->add('name')
            ->add('description')
            ->add('link')
            ->add('active')
            ->add('file')
            ->add('Save', 'submit')
            ->getForm();
        
        $form->handleRequest($request);
        
        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $site->upload();

            $em->persist($site);
            $em->flush();

            return $this->redirect($this->generateUrl('admin'));
        }
        
        return $this->render('MyHomePageBundle:Admin:upload.html.twig', array('form' => $form->createView(),));
    }
    
    public function upload()
    {

        if (null === $this->getFile()) {
            return;
        }
        $this->getFile()->move(
            $this->getUploadRootDir(),
            $this->getFile()->getClientOriginalName()
        );
        $this->path = $this->getFile()->getClientOriginalName();
        $this->file = null;
    }
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
//    public function uploadAction(Request $request) {
//        $document = new Document();
//        
//        $form = $this->createFormBuilder($document)
//            ->add('name')
//            ->add('file')
//            ->add('Save', 'submit')
//            ->getForm();
//        
//        $form->handleRequest($request);
//        
//        if ($form->isValid()) {
//            $em = $this->getDoctrine()->getManager();
//
//            $document->upload();
//
//            $em->persist($document);
//            $em->flush();
//
//            return $this->redirect($this->generateUrl('admin'));
//        }
//        
//        return $this->render('MyHomePageBundle:Admin:upload.html.twig', array('form' => $form->createView(),));
//    }
//    
//    public function upload()
//    {
//        // the file property can be empty if the field is not required
//        if (null === $this->getFile()) {
//            return;
//        }
//
//        // use the original file name here but you should
//        // sanitize it at least to avoid any security issues
//
//        // move takes the target directory and then the
//        // target filename to move to
//        $this->getFile()->move(
//            $this->getUploadRootDir(),
//            $this->getFile()->getClientOriginalName()
//        );
//
//        // set the path property to the filename where you've saved the file
//        $this->path = $this->getFile()->getClientOriginalName();
//
//        // clean up the file property as you won't need it anymore
//        $this->file = null;
//    }
}
