<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ColorRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['color:read']],
    denormalizationContext: ['groups' => ['color:write']]
)]
#[ORM\Entity(repositoryClass: ColorRepository::class)]
class Color
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['color:read', 'color:write'])]
    #[Assert\NotBlank(message: "Le nom de la couleur est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le nom de la couleur doit comporter au moins {{ limit }} caractère", maxMessage: "Le nom de la couleur ne peut pas dépasser {{ limit }} caractères")]
    private ?string $name = null;

    #[ORM\Column(length: 7)]
    #[Groups(['color:read', 'color:write'])]
    #[Assert\NotBlank(message: "Le code hexadécimal est obligatoire")]
    #[Assert\Length(min: 1, max: 7, minMessage: "Le code hexadécimal doit comporter au moins {{ limit }} caractère", maxMessage: "Le code hexadécimal ne peut pas dépasser {{ limit }} caractères")]
    private ?string $hexCode = null;

    /**
     * @var Collection<int, Product>
     */
    #[ORM\ManyToMany(targetEntity: Product::class, mappedBy: 'availableColors')]
    private Collection $products;

    public function __construct()
    {
        $this->products = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;

        return $this;
    }

    public function getHexCode(): ?string
    {
        return $this->hexCode;
    }

    public function setHexCode(string $hexCode): static
    {
        $this->hexCode = $hexCode;

        return $this;
    }

    /**
     * @return Collection<int, Product>
     */
    public function getProducts(): Collection
    {
        return $this->products;
    }

    public function addProduct(Product $product): static
    {
        if (!$this->products->contains($product)) {
            $this->products->add($product);
            $product->addAvailableColor($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            $product->removeAvailableColor($this);
        }

        return $this;
    }
} 