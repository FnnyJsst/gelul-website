<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['user:read']],
    denormalizationContext: ['groups' => ['user:write']]
)]
#[ORM\Entity(repositoryClass: UserRepository::class)]
class User
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "L'email est obligatoire")]
    #[Assert\Email(message: "L'email '{{ value }}' n'est pas valide.")]
    private ?string $email = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "Le mot de passe est obligatoire")]
    #[Assert\Length(min: 8, max: 255, minMessage: "Le mot de passe doit comporter au moins {{ limit }} caractères", maxMessage: "Le mot de passe ne peut pas dépasser {{ limit }} caractères")]
    #[ORM\Column(length: 255)]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "Le nom est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le nom doit comporter au moins {{ limit }} caractère", maxMessage: "Le nom ne peut pas dépasser {{ limit }} caractères")]
    private ?string $name = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "Le prénom est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le prénom doit comporter au moins {{ limit }} caractère", maxMessage: "Le prénom ne peut pas dépasser {{ limit }} caractères")]
    #[ORM\Column(length: 255)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "Le rôle est obligatoire")]
    #[Assert\Choice(['ROLE_USER', 'ROLE_ADMIN'], message: "Le rôle doit être soit 'ROLE_USER' soit 'ROLE_ADMIN'")]
    private ?string $role = null;

    #[ORM\Column(length: 255, unique: true)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "Le numéro de téléphone est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le numéro de téléphone doit comporter au moins {{ limit }} caractère", maxMessage: "Le numéro de téléphone ne peut pas dépasser {{ limit }} caractères")]
    private ?int $phone = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "L'adresse est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "L'adresse doit comporter au moins {{ limit }} caractère", maxMessage: "L'adresse ne peut pas dépasser {{ limit }} caractères")]
    private ?string $address = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "La ville est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "La ville doit comporter au moins {{ limit }} caractère", maxMessage: "La ville ne peut pas dépasser {{ limit }} caractères")]
    private ?string $city = null;

    #[ORM\Column(length: 255)]
    #[Groups(['user:read', 'user:write'])]
    #[Assert\NotBlank(message: "Le code postal est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le code postal doit comporter au moins {{ limit }} caractère", maxMessage: "Le code postal ne peut pas dépasser {{ limit }} caractères")]
    #[ORM\Column(length: 255)]
    private ?string $zipCode = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    #[ORM\OneToOne(mappedBy: 'user', cascade: ['persist', 'remove'])]
    private ?Cart $cart = null;

    /**
     * @var Collection<int, Wishlist>
     */
    #[ORM\OneToMany(targetEntity: Wishlist::class, mappedBy: 'user')]
    private Collection $wishlists;

    /**
     * @var Collection<int, Message>
     */
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Message::class)]
    private Collection $messages;

    /**
     * @var Collection<int, Order>
     */
    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Order::class)]
    private Collection $orders;

    public function __construct()
    {
        $this->wishlists = new ArrayCollection();
        $this->messages = new ArrayCollection();
        $this->orders = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;

        return $this;
    }

    public function getPassword(): ?string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    public function getRole(): ?string
    {
        return $this->role;
    }

    public function setRole(string $role): static
    {
        $this->role = $role;

        return $this;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): static
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getPhone(): ?int
    {
        return $this->phone;
    }

    public function setPhone(int $phone): static
    {
        $this->phone = $phone;

        return $this;
    }

    public function getAddress(): ?string
    {
        return $this->address;
    }

    public function setAddress(string $address): static
    {
        $this->address = $address;

        return $this;
    }

    public function getCity(): ?string
    {
        return $this->city;
    }

    public function setCity(string $city): static
    {
        $this->city = $city;

        return $this;
    }

    public function getZipCode(): ?string
    {
        return $this->zipCode;
    }

    public function setZipCode(string $zipCode): static
    {
        $this->zipCode = $zipCode;

        return $this;
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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }

    public function getCart(): ?Cart
    {
        return $this->cart;
    }

    public function setCart(?Cart $cart): static
    {
        // unset the owning side of the relation if necessary
        if ($cart === null && $this->cart !== null) {
            $this->cart->setUser(null);
        }

        // set the owning side of the relation if necessary
        if ($cart !== null && $cart->getUser() !== $this) {
            $cart->setUser($this);
        }

        $this->cart = $cart;

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
            $wishlist->setUser($this);
        }

        return $this;
    }

    public function removeWishlist(Wishlist $wishlist): static
    {
        if ($this->wishlists->removeElement($wishlist)) {
            // set the owning side to null (unless already changed)
            if ($wishlist->getUser() === $this) {
                $wishlist->setUser(null);
            }
        }

        return $this;
    }

    /**
     * @return Collection<int, Message>
     */
    public function getMessages(): Collection
    {
        return $this->messages;
    }

    public function addMessage(Message $message): static
    {
        if (!$this->messages->contains($message)) {
            $this->messages->add($message);
            $message->setUser($this);
        }
        return $this;
    }

    public function removeMessage(Message $message): static
    {
        if ($this->messages->removeElement($message)) {
            if ($message->getUser() === $this) {
                $message->setUser(null);
            }
        }
        return $this;
    }

    /**
     * @return Collection<int, Order>
     */
    public function getOrders(): Collection
    {
        return $this->orders;
    }

    public function addOrder(Order $order): static
    {
        if (!$this->orders->contains($order)) {
            $this->orders->add($order);
            $order->setUser($this);
        }
        return $this;
    }

    public function removeOrder(Order $order): static
    {
        if ($this->orders->removeElement($order)) {
            if ($order->getUser() === $this) {
                $order->setUser(null);
            }
        }
        return $this;
    }
}
