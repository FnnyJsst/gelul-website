<?php

namespace App\Controller;

use App\Entity\Order;
use App\Repository\OrderRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[Route('/api/orders')]
final class OrderController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private OrderRepository $orderRepository,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
    ) {}

    #[IsGranted('ROLE_ADMIN')]
    #[Route('', name: 'app_order_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $orders = $this->orderRepository->findAll();
        $jsonOrders = $this->serializer->serialize($orders, 'json', ['groups' => ['order:read']]);
        return new JsonResponse($jsonOrders, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('/{id}', name: 'app_order_show', methods: ['GET'])]
    public function show(Order $order): JsonResponse
    {
        if (!$this->isGranted('ROLE_ADMIN') && $order->getUser() !== $this->getUser()) {
            return new JsonResponse(['message' => 'Accès non autorisé'], JsonResponse::HTTP_FORBIDDEN);
        }
        $jsonOrder = $this->serializer->serialize($order, 'json', ['groups' => ['order:read']]);
        return new JsonResponse($jsonOrder, Response::HTTP_OK, [], true);
    }

    #[IsGranted('ROLE_USER')]
    #[Route('', name: 'app_order_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $order = $this->serializer->deserialize($request->getContent(), Order::class, 'json');
        $errors = $this->validator->validate($order);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
        }
        $this->entityManager->persist($order);
        $this->entityManager->flush();
        $jsonOrder = $this->serializer->serialize($order, 'json', ['groups' => ['order:read']]);
        return new JsonResponse($jsonOrder, Response::HTTP_CREATED, [], true);
    }

    #[IsGranted('ROLE_ADMIN')]
    #[Route('/{id}', name: 'app_order_update', methods: ['PUT'])]
    public function update(Request $request, Order $order): JsonResponse
    {
        $updatedOrder = $this->serializer->deserialize($request->getContent(), Order::class, 'json');
        // Exemple de mise à jour (à adapter selon les propriétés de ton entité Order) : on met à jour le statut uniquement.
        $order->setStatus($updatedOrder->getStatus());
        $this->entityManager->flush();
        $jsonOrder = $this->serializer->serialize($order, 'json', ['groups' => ['order:read']]);
        return new JsonResponse($jsonOrder, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_order_delete', methods: ['DELETE'])]
    public function delete(Order $order): JsonResponse
    {
        $this->entityManager->remove($order);
        $this->entityManager->flush();
        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }
}
