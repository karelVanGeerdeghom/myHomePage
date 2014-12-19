<?php

namespace My\HomePageBundle\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;

class SiteType extends AbstractType {
    public function setDefaultOptions(OptionsResolverInterface $resolver){
        $resolver->setDefaults(
            array(
                'data_class' => 'My\HomePageBundle\Entity\Site',
           )
        );
    }
    
    public function buildForm(FormBuilderInterface $builder, array $options) {
        $builder
            ->add('name')
            ->add('description')
            ->add('link')
            ->add('file', 'file')
            ->add('save', 'submit');
    }
    
    public function getName() {
        return 'site';
    }
}