<?php

namespace My\HomePageBundle\Controller;

use Symfony\Component\HttpFoundation\Request;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use My\HomePageBundle\Entity\Technology;
use My\HomePageBundle\Form\TechnologyType;

/**
 * Technology controller.
 *
 * @Route("/technology")
 */
class TechnologyController extends Controller
{

    /**
     * Lists all Technology entities.
     *
     * @Route("/", name="technology")
     * @Method("GET")
     * @Template()
     */
    public function indexAction()
    {
        $em = $this->getDoctrine()->getManager();

        $entities = $em->getRepository('MyHomePageBundle:Technology')->findAll();

        return array(
            'entities' => $entities,
        );
    }
    /**
     * Creates a new Technology entity.
     *
     * @Route("/", name="technology_create")
     * @Method("POST")
     * @Template("MyHomePageBundle:Technology:new.html.twig")
     */
    public function createAction(Request $request)
    {
        $entity = new Technology();
        $form = $this->createCreateForm($entity);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $em->persist($entity);
            $em->flush();

            return $this->redirect($this->generateUrl('technology_show', array('id' => $entity->getId())));
        }

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Creates a form to create a Technology entity.
     *
     * @param Technology $entity The entity
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createCreateForm(Technology $entity)
    {
        $form = $this->createForm(new TechnologyType(), $entity, array(
            'action' => $this->generateUrl('technology_create'),
            'method' => 'POST',
        ));

        $form->add('submit', 'submit', array('label' => 'Create'));

        return $form;
    }

    /**
     * Displays a form to create a new Technology entity.
     *
     * @Route("/new", name="technology_new")
     * @Method("GET")
     * @Template()
     */
    public function newAction()
    {
        $entity = new Technology();
        $form   = $this->createCreateForm($entity);

        return array(
            'entity' => $entity,
            'form'   => $form->createView(),
        );
    }

    /**
     * Finds and displays a Technology entity.
     *
     * @Route("/{id}", name="technology_show")
     * @Method("GET")
     * @Template()
     */
    public function showAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('MyHomePageBundle:Technology')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Technology entity.');
        }

        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
     * Displays a form to edit an existing Technology entity.
     *
     * @Route("/{id}/edit", name="technology_edit")
     * @Method("GET")
     * @Template()
     */
    public function editAction($id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('MyHomePageBundle:Technology')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Technology entity.');
        }

        $editForm = $this->createEditForm($entity);
        $deleteForm = $this->createDeleteForm($id);

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }

    /**
    * Creates a form to edit a Technology entity.
    *
    * @param Technology $entity The entity
    *
    * @return \Symfony\Component\Form\Form The form
    */
    private function createEditForm(Technology $entity)
    {
        $form = $this->createForm(new TechnologyType(), $entity, array(
            'action' => $this->generateUrl('technology_update', array('id' => $entity->getId())),
            'method' => 'PUT',
        ));

        $form->add('submit', 'submit', array('label' => 'Update'));

        return $form;
    }
    /**
     * Edits an existing Technology entity.
     *
     * @Route("/{id}", name="technology_update")
     * @Method("PUT")
     * @Template("MyHomePageBundle:Technology:edit.html.twig")
     */
    public function updateAction(Request $request, $id)
    {
        $em = $this->getDoctrine()->getManager();

        $entity = $em->getRepository('MyHomePageBundle:Technology')->find($id);

        if (!$entity) {
            throw $this->createNotFoundException('Unable to find Technology entity.');
        }

        $deleteForm = $this->createDeleteForm($id);
        $editForm = $this->createEditForm($entity);
        $editForm->handleRequest($request);

        if ($editForm->isValid()) {
            $em->flush();

            return $this->redirect($this->generateUrl('technology_edit', array('id' => $id)));
        }

        return array(
            'entity'      => $entity,
            'edit_form'   => $editForm->createView(),
            'delete_form' => $deleteForm->createView(),
        );
    }
    /**
     * Deletes a Technology entity.
     *
     * @Route("/{id}", name="technology_delete")
     * @Method("DELETE")
     */
    public function deleteAction(Request $request, $id)
    {
        $form = $this->createDeleteForm($id);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $entity = $em->getRepository('MyHomePageBundle:Technology')->find($id);

            if (!$entity) {
                throw $this->createNotFoundException('Unable to find Technology entity.');
            }

            $em->remove($entity);
            $em->flush();
        }

        return $this->redirect($this->generateUrl('technology'));
    }

    /**
     * Creates a form to delete a Technology entity by id.
     *
     * @param mixed $id The entity id
     *
     * @return \Symfony\Component\Form\Form The form
     */
    private function createDeleteForm($id)
    {
        return $this->createFormBuilder()
            ->setAction($this->generateUrl('technology_delete', array('id' => $id)))
            ->setMethod('DELETE')
            ->add('submit', 'submit', array('label' => 'Delete'))
            ->getForm()
        ;
    }
}
