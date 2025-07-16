<?php

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use App\Repository\MessageRepository;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;


#[ApiResource(
    normalizationContext: ['groups' => ['message:read']],
    denormalizationContext: ['groups' => ['message:write']]
)]
#[ORM\Entity(repositoryClass: MessageRepository::class)]
class Message
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\ManyToOne(inversedBy: 'messages', targetEntity: User::class)]
    #[ORM\JoinColumn(name: "user_id", referencedColumnName: "id", nullable: false)]
    private ?User $user = null;
   
    #[ORM\Column(length: 255)]
    #[Groups(['message:read', 'message:write'])]
    #[Assert\NotBlank(message: "Le sujet est obligatoire")]
    #[Assert\Length(min: 1, max: 255, minMessage: "Le sujet doit comporter au moins {{ limit }} caractère", maxMessage: "Le sujet ne peut pas dépasser {{ limit }} caractères")]
    private ?string $subject = null;

    #[ORM\Column(type: 'text')]
    #[Groups(['message:read', 'message:write'])]
    #[Assert\NotBlank(message: "Le contenu est obligatoire")]
    #[Assert\Length(min: 1, max: 1000, minMessage: "Le contenu doit comporter au moins {{ limit }} caractère", maxMessage: "Le contenu ne peut pas dépasser {{ limit }} caractères")]
    private ?string $content = null;

    #[ORM\Column(type: 'datetime_immutable')]
    private ?\DateTimeImmutable $date = null;

    #[ORM\Column(length: 255)]
    private ?string $status = null;

    public function __construct()
    {
        $this->date = new \DateTimeImmutable();
        $this->status = 'new';
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): static
    {
        $this->user = $user;
        return $this;
    }

    public function getSubject(): ?string
    {
        return $this->subject;
    }

    public function setSubject(string $subject): static
    {
        $this->subject = $subject;
        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(string $content): static
    {
        $this->content = $content;
        return $this;
    }

    public function getDate(): ?\DateTimeImmutable
    {
        return $this->date;
    }

    public function setDate(\DateTimeImmutable $date): static
    {
        $this->date = $date;
        return $this;
    }

    public function getStatus(): ?string
    {
        return $this->status;
    }

    public function setStatus(string $status): static
    {
        $this->status = $status;
        return $this;
    }
}
