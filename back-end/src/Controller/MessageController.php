<?php

namespace App\Controller;

use App\Entity\Message;
use App\Repository\MessageRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/messages')]
class MessageController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private MessageRepository $messageRepository,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
    ) {}

    #[IsGranted('ROLE_ADMIN')]
    #[Route('', name: 'app_message_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $messages = $this->messageRepository->findAll();
        
        $jsonMessages = $this->serializer->serialize($messages, 'json', [
            'groups' => ['message:read']
        ]);

        return new JsonResponse($jsonMessages, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/{id}', name: 'app_message_show', methods: ['GET'])]
    public function show(Message $message): JsonResponse
    {
        if (!$this->isGranted('ROLE_ADMIN') && $message->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Accès non autorisé'], JsonResponse::HTTP_FORBIDDEN);
        }

        $jsonMessage = $this->serializer->serialize($message, 'json', [
            'groups' => ['message:read']
        ]);

        return new JsonResponse($jsonMessage, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('', name: 'app_message_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $message = $this->serializer->deserialize(
            $request->getContent(),
            Message::class,
            'json'
        );

        $errors = $this->validator->validate($message);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($message);
        $this->entityManager->flush();

        $jsonMessage = $this->serializer->serialize($message, 'json', [
            'groups' => ['message:read']
        ]);

        return new JsonResponse($jsonMessage, Response::HTTP_CREATED, [], true);
    }

    #[Route('/{id}', name: 'app_message_update', methods: ['PUT'])]
    public function update(Request $request, Message $message): JsonResponse
    {
        $updatedMessage = $this->serializer->deserialize(
            $request->getContent(),
            Message::class,
            'json'
        );

        $message->setContent($updatedMessage->getContent());
        $message->setDate(new \DateTimeImmutable());

        $this->entityManager->flush();

        $jsonMessage = $this->serializer->serialize($message, 'json', [
            'groups' => ['message:read']
        ]);

        return new JsonResponse($jsonMessage, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_message_delete', methods: ['DELETE'])]
    public function delete(Message $message): JsonResponse
    {
        $this->entityManager->remove($message);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
