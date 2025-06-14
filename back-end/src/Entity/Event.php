<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\EventRepository;
use Doctrine\DBAL\Types\Types;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ApiResource(
    normalizationContext: ['groups' => ['event:read']],
    denormalizationContext: ['groups' => ['event:write']]
)]
#[ORM\Entity(repositoryClass: EventRepository::class)]
class Event
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(['event:read', 'event:write'])]
    #[Assert\NotBlank(message: "Le nom de l'événement est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le nom doit comporter au moins {{ limit }} caractère", maxMessage: "Le nom ne peut pas dépasser {{ limit }} caractères")]
    private ?string $name = null;

    #[ORM\Column(type: Types::TEXT)]
    #[Groups(['event:read', 'event:write'])]
    #[Assert\NotBlank(message: "La description de l'événement est obligatoire")]
    #[Assert\Length(min: 1, max: 1000, minMessage: "La description doit comporter au moins {{ limit }} caractère", maxMessage: "La description ne peut pas dépasser {{ limit }} caractères")]
    private ?string $description = null;

    #[ORM\Column(length: 255)]
    #[Groups(['event:read', 'event:write'])]
    #[Assert\NotBlank(message: "Le lieu de l'événement est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le lieu doit comporter au moins {{ limit }} caractère", maxMessage: "Le lieu ne peut pas dépasser {{ limit }} caractères")]
    private ?string $location = null;

    #[ORM\Column(type: Types::DATE_MUTABLE)]
    #[Groups(['event:read', 'event:write'])]
    #[Assert\NotBlank(message: "La date de l'événement est obligatoire")]
    #[Assert\DateTime(message: "La date doit être une date valide")]
    private ?\DateTimeInterface $date = null;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $image = null;

    #[ORM\Column]
    private ?\DateTimeImmutable $createdAt = null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(int $id): static
    {
        $this->id = $id;

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

    public function getDescription(): ?string
    {
        return $this->description;
    }

    public function setDescription(string $description): static
    {
        $this->description = $description;

        return $this;
    }

    public function getLocation(): ?string
    {
        return $this->location;
    }

    public function setLocation(string $location): static
    {
        $this->location = $location;

        return $this;
    }

    public function getDate(): ?\DateTimeInterface
    {
        return $this->date;
    }

    public function setDate(\DateTimeInterface $date): static
    {
        $this->date = $date;

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

    public function getCreatedAt(): ?\DateTimeImmutable
    {
        return $this->createdAt;
    }

    public function setCreatedAt(\DateTimeImmutable $createdAt): static
    {
        $this->createdAt = $createdAt;

        return $this;
    }
}
