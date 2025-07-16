<?php

namespace App\Controller;

use App\Entity\Event;
use App\Repository\EventRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_ADMIN')]
#[Route('/api/events')]
class EventController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private EventRepository $eventRepository,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
    ) {}

    #[Route('', name: 'app_event_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $events = $this->eventRepository->findAll();

        $jsonEvents = $this->serializer->serialize($events, 'json', [
            'groups' => ['event:read']
        ]);

        return new JsonResponse($jsonEvents, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_event_show', methods: ['GET'])]
    public function show(Event $event): JsonResponse
    {
        $jsonEvent = $this->serializer->serialize($event, 'json', [
            'groups' => ['event:read']
        ]);

        return new JsonResponse($jsonEvent, Response::HTTP_OK, [], true);
    }


    #[Route('', name: 'app_event_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $event = $this->serializer->deserialize(
            $request->getContent(), 
            Event::class, 
            'json');

        $errors = $this->validator->validate($event);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($event);
        $this->entityManager->flush();

        $jsonEvent = $this->serializer->serialize($event, 'json', [
            'groups' => ['event:read']
        ]);

        return new JsonResponse(['message' => 'Événement créé avec succès'], JsonResponse::HTTP_CREATED);
    }

    #[Route('/{id}', name: 'app_event_update', methods: ['PUT'])]
    public function update(Request $request, Event $event): JsonResponse
    {
        $updatedEvent = $this->serializer->deserialize(
            $request->getContent(), 
            Event::class, 
            'json'
        );

        $event->setName($updatedEvent->getName());
        $event->setDescription($updatedEvent->getDescription());
        $event->setLocation($updatedEvent->getLocation());
        $event->setDate($updatedEvent->getDate());

        $this->entityManager->flush();

        $jsonEvent = $this->serializer->serialize($event, 'json', [
            'groups' => ['event:read']
        ]);

        return new JsonResponse($jsonEvent, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_event_delete', methods: ['DELETE'])]
    public function delete(Event $event): JsonResponse
    {
        $this->entityManager->remove($event);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }


} 