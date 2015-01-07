<?php

namespace My\HomePageBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * Technology
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="My\HomePageBundle\Entity\TechnologyRepository")
 */
class Technology
{
    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var string
     *
     * @ORM\Column(name="description", type="string", length=100)
     */
    private $description;

    /**
     *
     * @var \Doctrine\Common\Collections\ArrayCollection $sites
     * 
     * @ORM\ManyToMany(targetEntity="Site", mappedBy="technologies")
     */
    protected $sites;

    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set description
     *
     * @param string $description
     * @return Technology
     */
    public function setDescription($description)
    {
        $this->description = $description;

        return $this;
    }

    /**
     * Get description
     *
     * @return string 
     */
    public function getDescription()
    {
        return $this->description;
    }
    /**
     * Constructor
     */
    public function __construct()
    {
        $this->sites = new \Doctrine\Common\Collections\ArrayCollection();
    }

    /**
     * Add sites
     *
     * @param \My\HomePageBundle\Entity\Site $sites
     * @return Technology
     */
    public function addSite(\My\HomePageBundle\Entity\Site $sites)
    {
        $this->sites[] = $sites;

        return $this;
    }

    /**
     * Remove sites
     *
     * @param \My\HomePageBundle\Entity\Site $sites
     */
    public function removeSite(\My\HomePageBundle\Entity\Site $sites)
    {
        $this->sites->removeElement($sites);
    }

    /**
     * Get sites
     *
     * @return \Doctrine\Common\Collections\Collection 
     */
    public function getSites()
    {
        return $this->sites;
    }
    
    public function __toString()
    {
        return $this->getDescription();
    }
}
