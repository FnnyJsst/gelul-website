<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\ProductRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['product:read']],
    denormalizationContext: ['groups' => ['product:write']]
)]
#[ORM\Entity(repositoryClass: ProductRepository::class)]
class Product
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['product:read'])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['product:read', 'product:write'])]
    #[Assert\NotBlank(message: "Le nom du produit est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le nom doit comporter au moins {{ limit }} caractère", maxMessage: "Le nom ne peut pas dépasser {{ limit }} caractères")]
    private ?string $name = null;

    #[ORM\ManyToOne(targetEntity: Category::class, inversedBy: 'products')]
    #[ORM\JoinColumn(nullable: false)]
    #[Groups(['product:read', 'product:write'])]
    #[Assert\NotNull(message: "La catégorie est obligatoire")]
    private ?Category $category = null;

    #[ORM\Column(type: Types::TEXT, nullable: true)]
    #[Groups(['product:read', 'product:write'])]
    #[Assert\Length(min: 1, max: 1000, minMessage: "La description doit comporter au moins {{ limit }} caractère", maxMessage: "La description ne peut pas dépasser {{ limit }} caractères")]
    private ?string $description = null;

    #[ORM\Column(type: Types::DECIMAL, precision: 10, scale: 2)]
    #[Groups(['product:read', 'product:write'])]
    #[Assert\Positive(message: "Le prix doit être supérieur à 0")]
    private ?string $price = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(['product:read', 'product:write'])]
    #[Assert\Length(max: 255, maxMessage: "Le chemin de l'image ne peut pas dépasser {{ limit }} caractères")]
    private ?string $image = null;

    #[ORM\Column]
    #[Groups(['product:read', 'product:write'])]
    #[Assert\GreaterThanOrEqual(0, message: "Le stock ne peut pas être négatif")]
    private ?int $stock = null;

    /**
     * @var Collection<int, CartItem>
     */
    #[ORM\OneToMany(targetEntity: CartItem::class, mappedBy: 'product')]
    private Collection $cartItems;

    /**
     * @var Collection<int, Wishlist>
     */
    #[ORM\ManyToMany(targetEntity: Wishlist::class, mappedBy: 'items')]
    private Collection $wishlists;

    /**
     * @var Collection<int, Color>
     */
    #[ORM\ManyToMany(targetEntity: Color::class, inversedBy: 'products')]
    #[ORM\JoinTable(name: 'product_colors')]
    #[Groups(['product:read'])]
    private Collection $availableColors;

    #[ORM\Column(type: 'boolean')]
    #[Groups(['product:read', 'product:write'])]
    #[Assert\Type(type: "bool", message: "La valeur doit être un booléen")]
    private bool $isCustomizable = false;

    public function __construct()
    {
        $this->cartItems = new ArrayCollection();
        $this->wishlists = new ArrayCollection();
        $this->availableColors = new ArrayCollection();
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

    public function getCategory(): ?Category
    {
        return $this->category;
    }

    public function setCategory(?Category $category): static
    {
        $this->category = $category;

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

    public function getPrice(): ?string
    {
        return $this->price;
    }

    public function setPrice(string $price): static
    {
        $this->price = $price;

        return $this;
    }

    public function getImage(): ?string
    {
        return $this->image;
    }

    public function setImage(?string $image): static
    {
        $this->image = $image;

        return $this;
    }

    public function getStock(): ?int
    {
        return $this->stock;
    }

    public function setStock(int $stock): static
    {
        $this->stock = $stock;

        return $this;
    }

    /**
     * @return Collection<int, CartItem>
     */
    public function getCartItems(): Collection
    {
        return $this->cartItems;
    }

    public function addCartItem(CartItem $cartItem): static
    {
        if (!$this->cartItems->contains($cartItem)) {
            $this->cartItems->add($cartItem);
            $cartItem->setProduct($this);
        }

        return $this;
    }

    public function removeCartItem(CartItem $cartItem): static
    {
        if ($this->cartItems->removeElement($cartItem)) {
            // set the owning side to null (unless already changed)
            if ($cartItem->getProduct() === $this) {
                $cartItem->setProduct(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Wishlist>
     */
    public function getWishlists(): Collection
    {
        return $this->wishlists;
    }

    public function addWishlist(Wishlist $wishlist): static
    {
        if (!$this->wishlists->contains($wishlist)) {
            $this->wishlists->add($wishlist);
            $wishlist->addItem($this);
        }

        return $this;
    }

    public function removeWishlist(Wishlist $wishlist): static
    {
        if ($this->wishlists->removeElement($wishlist)) {
            $wishlist->removeItem($this);
        }

        return $this;
    }

    public function getIsCustomizable(): bool
    {
        return $this->isCustomizable;
    }

    public function setIsCustomizable(bool $isCustomizable): static
    {
        $this->isCustomizable = $isCustomizable;

        return $this;
    }

    /**
     * @return Collection<int, Color>
     */
    public function getAvailableColors(): Collection
    {
        return $this->availableColors;
    }

    public function addAvailableColor(Color $color): static
    {
        if (!$this->availableColors->contains($color)) {
            $this->availableColors->add($color);
        }

        return $this;
    }

    public function removeAvailableColor(Color $color): static
    {
        $this->availableColors->removeElement($color);

        return $this;
    }
}
