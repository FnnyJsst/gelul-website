<?php

namespace App\Controller;

use App\Entity\Category;
use App\Repository\CategoryRepository;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

#[Route('/api/categories', name: 'api_category_')]
class CategoryController extends AbstractController
{
    public function __construct(
        private CategoryRepository $categoryRepository
    ) {
    }

    #[Route('', name: 'list', methods: ['GET'])]
    public function list(): JsonResponse
    {
        $categories = $this->categoryRepository->findAll();

        $data = array_map(function (Category $category) {
            return [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'slug' => $category->getSlug(),
                'description' => $category->getDescription(),
                'productCount' => $category->getProducts()->count()
            ];
        }, $categories);

        return $this->json($data);
    }

    #[Route('/{slug}', name: 'show', methods: ['GET'])]
    public function show(string $slug): JsonResponse
    {
        $category = $this->categoryRepository->findOneBySlug($slug);

        if (!$category) {
            return $this->json(
                ['error' => 'Catégorie non trouvée'],
                Response::HTTP_NOT_FOUND
            );
        }

        return $this->json([
            'id' => $category->getId(),
            'name' => $category->getName(),
            'slug' => $category->getSlug(),
            'description' => $category->getDescription(),
            'productCount' => $category->getProducts()->count()
        ]);
    }

    #[Route('/with-count', name: 'with_count', methods: ['GET'])]
    public function listWithProductCount(): JsonResponse
    {
        $results = $this->categoryRepository->findAllWithProductCount();

        $data = array_map(function ($result) {
            $category = $result[0];
            return [
                'id' => $category->getId(),
                'name' => $category->getName(),
                'slug' => $category->getSlug(),
                'description' => $category->getDescription(),
                'productCount' => $result['productCount']
            ];
        }, $results);

        return $this->json($data);
    }
}

