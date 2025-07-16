<?php

namespace App\Controller;

use App\Entity\Product;
use App\Repository\ProductRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Component\Security\Http\Attribute\IsGranted;

#[IsGranted('ROLE_ADMIN')]
#[Route('/api/products')]
class ProductController extends AbstractController
{
    public function __construct(
        private EntityManagerInterface $entityManager,
        private ProductRepository $productRepository,
        private SerializerInterface $serializer,
        private ValidatorInterface $validator
    ) {}

    #[Route('', name: 'app_product_list', methods: ['GET'])]
    public function list(Request $request): JsonResponse
    {
        // Get the parameters of the request
        $page = $request->query->getInt('page', 1);
        $limit = $request->query->getInt('limit', 10);
        $category = $request->query->get('category');
        $search = $request->query->get('search');

        // Get the products with pagination and filters
        $products = $this->productRepository->findByFilters($page, $limit, $category, $search);

        // Serialization of the products
        $jsonProducts = $this->serializer->serialize($products, 'json', [
            'groups' => ['product:read']
        ]);

        return new JsonResponse($jsonProducts, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_product_show', methods: ['GET'])]
    public function show(Product $product): JsonResponse
    {
        // Serialization of the product
        $jsonProduct = $this->serializer->serialize($product, 'json', [
            'groups' => ['product:read']
        ]);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, [], true);
    }

    #[Route('', name: 'app_product_create', methods: ['POST'])]
    public function create(Request $request): JsonResponse
    {
        // Check the admin rights
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        // Deserialization of the data
        $product = $this->serializer->deserialize(
            $request->getContent(),
            Product::class,
            'json'
        );

        // Validation of the data
        $errors = $this->validator->validate($product);
        if (count($errors) > 0) {
            // Convert the errors to an array for a more readable format
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        // Persistence of the product
        $this->entityManager->persist($product);
        $this->entityManager->flush();

        // Serialization of the response
        $jsonProduct = $this->serializer->serialize($product, 'json', [
            'groups' => ['product:read']
        ]);

        return new JsonResponse($jsonProduct, Response::HTTP_CREATED, [], true);
    }

    #[Route('/{id}', name: 'app_product_update', methods: ['PUT'])]
    public function update(Request $request, Product $product): JsonResponse
    {
        // Check the admin rights
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        // Deserialization of the data
        $updatedProduct = $this->serializer->deserialize(
            $request->getContent(),
            Product::class,
            'json'
        );

        // Update the properties
        $product->setName($updatedProduct->getName());
        $product->setDescription($updatedProduct->getDescription());
        $product->setPrice($updatedProduct->getPrice());
        $product->setCategory($updatedProduct->getCategory());
        $product->setStock($updatedProduct->getStock());
        $product->setImage($updatedProduct->getImage());
        $product->setIsCustomizable($updatedProduct->getIsCustomizable());

        // Validation of the data
        $errors = $this->validator->validate($product);
        if (count($errors) > 0) {
            // Convert the errors to an array for a more readable format
            $errorMessages = [];
            foreach ($errors as $error) {
                $errorMessages[$error->getPropertyPath()] = $error->getMessage();
            }
            return new JsonResponse(['errors' => $errorMessages], Response::HTTP_BAD_REQUEST);
        }

        // Persistence of the modifications
        $this->entityManager->flush();

        // Serialization of the response
        $jsonProduct = $this->serializer->serialize($product, 'json', [
            'groups' => ['product:read']
        ]);

        return new JsonResponse($jsonProduct, Response::HTTP_OK, [], true);
    }

    #[Route('/{id}', name: 'app_product_delete', methods: ['DELETE'])]
    public function delete(Product $product): JsonResponse
    {
        // Check the admin rights
        $this->denyAccessUnlessGranted('ROLE_ADMIN');

        // Delete the product
        $this->entityManager->remove($product);
        $this->entityManager->flush();

        return new JsonResponse(null, Response::HTTP_NO_CONTENT);
    }

    #[Route('/{id}/colors', name: 'app_product_colors', methods: ['GET'])]
    public function getColors(Product $product): JsonResponse
    {
        $colors = $product->getAvailableColors();
        
        $jsonColors = $this->serializer->serialize($colors, 'json', [
            'groups' => ['color:read']
        ]);

        return new JsonResponse($jsonColors, Response::HTTP_OK, [], true);
    }

    private function validateProduct(Product $product): array
    {
        $errors = [];
        
        if (empty($product->getName())) {
            $errors[] = 'Le nom du produit est obligatoire';
        }
        
        if ($product->getPrice() <= 0) {
            $errors[] = 'Le prix doit être supérieur à 0';
        }
        
        if ($product->getStock() < 0) {
            $errors[] = 'Le stock ne peut pas être négatif';
        }
        
        if (empty($product->getCategory())) {
            $errors[] = 'La catégorie est obligatoire';
        }

        return $errors;
    }
}
