<?php

namespace App\Entity;

use App\Repository\OrderItemRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: OrderItemRepository::class)]
class OrderItem
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'orderItems', targetEntity: Order::class)]
    #[ORM\JoinColumn(name: "order_id", referencedColumnName: "id", nullable: false)]
    private ?Order $order = null;

    #[ORM\ManyToOne(targetEntity: Product::class)]
    #[ORM\JoinColumn(name: "product_id", referencedColumnName: "id", nullable: false)]
    private ?Product $product = null;

    #[ORM\Column]
    #[Groups(['order:read', 'order:write'])]
    #[Assert\Positive(message: "La quantité doit être supérieure à 0")]
    private ?int $quantity = null;

    #[Groups(['order:read', 'order:write'])]
    #[Assert\Positive(message: "Le prix doit être supérieur à 0")]
    #[ORM\Column(type: 'float')]
    private ?float $price = null;

    #[ORM\Column(nullable: true)]
    #[Groups(['order:read', 'order:write'])]
    #[Assert\Positive(message: "Le sous-total doit être supérieur à 0")]
    #[ORM\Column(type: 'float')]
    private ?float $subTotal = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getOrder(): ?Order
    {
        return $this->order;
    }

    public function setOrder(?Order $order): static
    {
        $this->order = $order;
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

    public function getSubTotal(): ?float
    {
        return $this->subTotal;
    }

    public function setSubTotal(float $subTotal): static
    {
        $this->subTotal = $subTotal;
        return $this;
    }
}
