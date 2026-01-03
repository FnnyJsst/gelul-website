<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use App\Repository\CategoryRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    operations: [
        new Get(),
        new GetCollection()
    ],
    normalizationContext: ['groups' => ['category:read']],
    denormalizationContext: ['groups' => ['category:write']]
)]
#[ORM\Entity(repositoryClass: CategoryRepository::class)]
class Category
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['category:read', 'product:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['category:read', 'category:write', 'product:read'])]
    #[Assert\NotBlank(message: "Le nom de la catégorie est obligatoire")]
    #[Assert\Length(
        min: 1,
        max: 255,
        minMessage: "Le nom doit comporter au moins {{ limit }} caractère",
        maxMessage: "Le nom ne peut pas dépasser {{ limit }} caractères"
    )]
    private ?string $name = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['category:read', 'category:write'])]
    #[Assert\NotBlank(message: "Le slug est obligatoire")]
    private ?string $slug = null;

    #[ORM\Column(type: 'text', nullable: true)]
    #[Groups(['category:read', 'category:write'])]
    private ?string $description = null;

    /**
     * @var Collection<int, Product>
     */
    #[ORM\OneToMany(targetEntity: Product::class, mappedBy: 'category')]
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
        
        // Génération automatique du slug
        if (!$this->slug) {
            $this->slug = $this->generateSlug($name);
        }

        return $this;
    }

    public function getSlug(): ?string
    {
        return $this->slug;
    }

    public function setSlug(string $slug): static
    {
        $this->slug = $slug;

        return $this;
    }

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(?string $description): static
    {
        $this->description = $description;

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
            $product->setCategory($this);
        }

        return $this;
    }

    public function removeProduct(Product $product): static
    {
        if ($this->products->removeElement($product)) {
            // set the owning side to null (unless already changed)
            if ($product->getCategory() === $this) {
                $product->setCategory(null);
            }
        }

        return $this;
    }

    /**
     * Génère un slug à partir du nom
     */
    private function generateSlug(string $text): string
    {
        // Remplace les caractères accentués
        $text = iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $text);
        
        // Remplace tout ce qui n'est pas une lettre ou un chiffre par un tiret
        $text = preg_replace('/[^a-zA-Z0-9]+/', '-', $text);
        
        // Convertit en minuscules
        $text = strtolower($text);
        
        // Supprime les tirets en début et fin de chaîne
        $text = trim($text, '-');
        
        return $text;
    }
}

