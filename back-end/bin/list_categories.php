#!/usr/bin/env php
<?php

/**
 * Script pour lister toutes les catégories avec leurs statistiques
 * 
 * Usage: php list_categories.php
 */

require __DIR__.'/vendor/autoload.php';

use App\Entity\Category;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Component\Dotenv\Dotenv;

// Charger les variables d'environnement
(new Dotenv())->bootEnv(__DIR__.'/.env');

// Créer le kernel Symfony
$kernel = new \App\Kernel($_SERVER['APP_ENV'], (bool) $_SERVER['APP_DEBUG']);
$kernel->boot();
$container = $kernel->getContainer();

/** @var EntityManagerInterface $entityManager */
$entityManager = $container->get('doctrine.orm.entity_manager');

try {
    $categoryRepository = $entityManager->getRepository(Category::class);
    $categories = $categoryRepository->findAll();
    
    if (empty($categories)) {
        echo "Aucune catégorie trouvée.\n";
        exit(0);
    }
    
    echo "\n📋 Liste des catégories\n";
    echo str_repeat("=", 80) . "\n\n";
    
    foreach ($categories as $category) {
        $productCount = $category->getProducts()->count();
        
        echo "🏷️  " . $category->getName() . "\n";
        echo "   ID: " . $category->getId() . "\n";
        echo "   Slug: " . $category->getSlug() . "\n";
        
        if ($category->getDescription()) {
            echo "   Description: " . $category->getDescription() . "\n";
        }
        
        echo "   Produits: " . $productCount . "\n";
        echo "\n";
    }
    
    echo str_repeat("=", 80) . "\n";
    echo "Total: " . count($categories) . " catégorie(s)\n\n";
    
} catch (\Exception $e) {
    echo "❌ Erreur: " . $e->getMessage() . "\n";
    exit(1);
}

