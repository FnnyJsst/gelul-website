<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\CartItemRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['cart_item:read']],
    denormalizationContext: ['groups' => ['cart_item:write']]
)]
#[ORM\Entity(repositoryClass: CartItemRepository::class)]
class CartItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(['cart_item:read'])]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'cartItems', targetEntity: Cart::class)]
    #[ORM\JoinColumn(nullable: false)]
    #[Assert\NotBlank(message: "Le panier est obligatoire")]
    #[Groups(['cart_item:read', 'cart_item:write'])]
    private ?Cart $cart = null;

    #[ORM\ManyToOne(inversedBy: 'cartItems')]
    #[Assert\NotBlank(message: "Le produit est obligatoire")]
    #[Groups(['cart_item:read', 'cart_item:write'])]
    private ?Product $product = null;

    #[ORM\Column]
    #[Groups(['cart_item:read', 'cart_item:write'])]
    #[Assert\NotBlank(message: "La quantité est obligatoire")]
    #[Assert\Positive(message: "La quantité doit être supérieure à 0")]
    private ?int $quantity = null;

    #[ORM\Column]
    #[Groups(['cart_item:read', 'cart_item:write'])]
    #[Assert\NotBlank(message: "Le prix est obligatoire")]
    #[Assert\Positive(message: "Le prix doit être supérieur à 0")]
    private ?float $price = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getCart(): ?Cart
    {
        return $this->cart;
    }

    public function setCart(?Cart $cart): static
    {
        $this->cart = $cart;
        return $this;
    }

    public function getProduct(): ?Product
    {
        return $this->product;
    }

    public function setProduct(?Product $product): static
    {
        $this->product = $product;
        return $this;
    }

    public function getQuantity(): ?int
    {
        return $this->quantity;
    }

    public function setQuantity(int $quantity): static
    {
        $this->quantity = $quantity;
        return $this;
    }

    public function getPrice(): ?float
    {
        return $this->price;
    }

    public function setPrice(float $price): static
    {
        $this->price = $price;
        return $this;
    }
}
