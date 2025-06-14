<?php

namespace App\Controller;

use App\Entity\Cart;
use App\Repository\CartRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;

#[Route('/api/carts')]
class CartController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private CartRepository $cartRepository,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
    ) {}

    #[Route('', name: 'app_cart_list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $carts = $this->cartRepository->findAll();
        
        $jsonCarts = $this->serializer->serialize($carts, 'json', [
            'groups' => ['cart:read']
        ]);

        return new JsonResponse($jsonCarts, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_cart_show', methods: ['GET'])]
    public function show(Cart $cart): JsonResponse
    {
        $jsonCart = $this->serializer->serialize($cart, 'json', [
            'groups' => ['cart:read']
        ]);

        return new JsonResponse($jsonCart, Response::HTTP_OK, [], true);
    }

    #[Route('', name: 'app_cart_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        $cart = $this->serializer->deserialize(
            $request->getContent(),
            Cart::class,
            'json'
        );

        $errors = $this->validator->validate($cart);
        if (count($errors) > 0) {
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
             return new JsonResponse(['errors' => $errorMessages], JsonResponse::HTTP_BAD_REQUEST);
        }

        $this->entityManager->persist($cart);
        $this->entityManager->flush();

        $jsonCart = $this->serializer->serialize($cart, 'json', [
            'groups' => ['cart:read']
        ]);

        return new JsonResponse($jsonCart, Response::HTTP_CREATED, [], true);
    }

    #[Route('/{id}', name: 'app_cart_update', methods: ['PUT'])]
    public function update(Request $request, Cart $cart): JsonResponse
    {
        $updatedCart = $this->serializer->deserialize(
            $request->getContent(),
            Cart::class,
            'json'
        );

        $cart->setTotalPrice($updatedCart->getTotalPrice());
        $cart->setUpdatedAt(new \DateTimeImmutable());

        $this->entityManager->flush();

        $jsonCart = $this->serializer->serialize($cart, 'json', [
            'groups' => ['cart:read']
        ]);

        return new JsonResponse($jsonCart, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_cart_delete', methods: ['DELETE'])]
    public function delete(Cart $cart): JsonResponse
    {
        $this->entityManager->remove($cart);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/items', name: 'app_cart_items', methods: ['GET'])]
    public function getItems(Cart $cart): JsonResponse
    {
        $items = $cart->getCartItems();
        
        $jsonItems = $this->serializer->serialize($items, 'json', [
            'groups' => ['cart_item:read']
        ]);

        return new JsonResponse($jsonItems, Response::HTTP_OK, [], true);
    }
}
