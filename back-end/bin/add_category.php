#!/usr/bin/env php
<?php

/**
 * Script pour ajouter une nouvelle catégorie
 * 
 * Usage: php add_category.php "Nom de la catégorie" "Description optionnelle"
 * Exemple: php add_category.php "Luminaires" "Lampes et éclairages pour votre intérieur"
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

// Vérifier les arguments
if ($argc < 2) {
    echo "Usage: php add_category.php \"Nom de la catégorie\" \"Description optionnelle\"\n";
    echo "Exemple: php add_category.php \"Luminaires\" \"Lampes et éclairages\"\n";
    exit(1);
}

$name = $argv[1];
$description = $argv[2] ?? null;

try {
    // Vérifier si la catégorie existe déjà
    $categoryRepository = $entityManager->getRepository(Category::class);
    
    // Générer le slug
    $slug = strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', 
        iconv('UTF-8', 'ASCII//TRANSLIT//IGNORE', $name)
    ), '-'));
    
    $existing = $categoryRepository->findOneBy(['slug' => $slug]);
    if ($existing) {
        echo "❌ Erreur: Une catégorie avec ce nom existe déjà (slug: $slug)\n";
        exit(1);
    }
    
    // Créer la nouvelle catégorie
    $category = new Category();
    $category->setName($name);
    $category->setSlug($slug);
    if ($description) {
        $category->setDescription($description);
    }
    
    $entityManager->persist($category);
    $entityManager->flush();
    
    echo "✅ Catégorie créée avec succès !\n";
    echo "   ID: " . $category->getId() . "\n";
    echo "   Nom: " . $category->getName() . "\n";
    echo "   Slug: " . $category->getSlug() . "\n";
    if ($description) {
        echo "   Description: " . $category->getDescription() . "\n";
    }
    
} catch (\Exception $e) {
    echo "❌ Erreur: " . $e->getMessage() . "\n";
    exit(1);
}

