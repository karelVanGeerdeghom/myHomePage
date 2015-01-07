<?php

namespace My\HomePageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\File\UploadedFile;

/**
 * Site
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="My\HomePageBundle\Entity\SiteRepository")
 */
class Site {
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    public $id;

    /**
     * @var string
     *
     * @ORM\Column(name="name", type="string", length=100)
     */
    public $name;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="text")
     */
    public $description;

    /**
     * @var string
     *
     * @ORM\Column(name="link", type="string", length=255)
     */
    public $link;

    /**
     * @var string
     *
     * @ORM\Column(name="path", type="string", length=255)
     */
    public $path;

    /**
     * @var boolean
     *
     * @ORM\Column(name="active", type="boolean")
     */
    public $active;

    /**
     *
     * @var \Doctrine\Common\Collections\ArrayCollection $technologies
     * 
     * @ORM\ManyToMany(targetEntity="Technology", inversedBy="sites")
     * @ORM\JoinTable(name="site_technology",
     *      joinColumns={@ORM\JoinColumn(name="site_id", referencedColumnName="id")},
     *      inverseJoinColumns={@ORM\JoinColumn(name="technology_id", referencedColumnName="id")}
     * )
     */
    protected $technologies;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId() {
        return $this->id;
    }

    /**
     * Set name
     *
     * @param string $name
     * @return Site
     */
    public function setName($name) {
        $this->name = $name;

        return $this;
    }

    /**
     * Get name
     *
     * @return string 
     */
    public function getName() {
        return $this->name;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Site
     */
    public function setDescription($description) {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription() {
        return $this->description;
    }

    /**
     * Set link
     *
     * @param string $link
     * @return Site
     */
    public function setLink($link) {
        $this->link = $link;

        return $this;
    }

    /**
     * Get link
     *
     * @return string 
     */
    public function getLink() {
        return $this->link;
    }

    /**
     * Set path
     *
     * @param string $path
     * @return Site
     */
    public function setPath($path) {
        $this->path = $path;

        return $this;
    }

    /**
     * Get path
     *
     * @return string 
     */
    public function getPath() {
        return $this->path;
    }

    /**
     * Set active
     *
     * @param boolean $active
     * @return Site
     */
    public function setActive($active) {
        $this->active = $active;

        return $this;
    }

    /**
     * Get active
     *
     * @return boolean 
     */
    public function getActive() {
        return $this->active;
    }
    
    public function getAbsolutePath()
    {
        return null === $this->path
            ? null
            : $this->getUploadRootDir().'/'.$this->path;
    }

    public function getWebPath()
    {
        return null === $this->path
            ? null
            : $this->getUploadDir().'/'.$this->path;
    }

    protected function getUploadRootDir()
    {
        // the absolute directory path where uploaded
        // documents should be saved
        return __DIR__.'/../../../../web/'.$this->getUploadDir();
    }

    protected function getUploadDir()
    {
        // get rid of the __DIR__ so it doesn't screw up
        // when displaying uploaded doc/image in the view.
        return 'bundles/homepage/images';
    }
    
    /**
     * @Template()
     */
    public function uploadAction(Request $request)
    {
        $document = new Document();
        $form = $this->createFormBuilder($document)
            ->add('name')
            ->add('file')
            ->getForm();

        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();

            $em->persist($document);
            $em->flush();

            return $this->redirect($this->generateUrl('/admin'));
        }

        return array('form' => $form->createView());
    }
    
    public function upload()
    {
        // the file property can be empty if the field is not required
        if (null === $this->getFile()) {
            return;
        }

        // use the original file name here but you should
        // sanitize it at least to avoid any security issues

        // move takes the target directory and then the
        // target filename to move to
        $this->getFile()->move(
            $this->getUploadRootDir(),
            $this->getFile()->getClientOriginalName()
        );

        // set the path property to the filename where you've saved the file
        $this->path = $this->getFile()->getClientOriginalName();

        // clean up the file property as you won't need it anymore
        $this->file = null;
    }
    
    /**
     * @Assert\File(maxSize="6000000")
     */
    private $file;

    /**
     * Sets file.
     *
     * @param UploadedFile $file
     */
    public function setFile(UploadedFile $file = null)
    {
        $this->file = $file;
    }

    /**
     * Get file.
     *
     * @return UploadedFile
     */
    public function getFile()
    {
        return $this->file;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->technologies = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add technologies
     *
     * @param \My\HomePageBundle\Entity\Technology $technologies
     * @return Site
     */
    public function addTechnology(\My\HomePageBundle\Entity\Technology $technologies)
    {
        $this->technologies[] = $technologies;

        return $this;
    }

    /**
     * Remove technologies
     *
     * @param \My\HomePageBundle\Entity\Technology $technologies
     */
    public function removeTechnology(\My\HomePageBundle\Entity\Technology $technologies)
    {
        $this->technologies->removeElement($technologies);
    }

    /**
     * Get technologies
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getTechnologies()
    {
        return $this->technologies;
    }
    
    public function __toString()
    {
        return $this->getName();
    }
}
