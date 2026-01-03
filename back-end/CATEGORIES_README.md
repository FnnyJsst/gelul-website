# Système de Catégories - Boutique Gelul

## Vue d'ensemble

Le système de catégories a été mis en place pour organiser les produits de votre boutique en deux catégories principales :
- **Mobilier** : Meubles et éléments d'ameublement
- **Objet de décoration** : Objets décoratifs

## Structure de la base de données

### Table Category
- `id` : Identifiant unique
- `name` : Nom de la catégorie (ex: "Mobilier")
- `slug` : Version URL-friendly du nom (ex: "mobilier")
- `description` : Description optionnelle de la catégorie

### Modification de Product
La colonne `category` (VARCHAR) a été remplacée par une relation `category_id` (relation ManyToOne vers Category).

## Installation

### 1. Appliquer la migration

Pour créer la table des catégories et migrer les données existantes :

```bash
cd back-end
php bin/console doctrine:migrations:migrate
```

Cette migration va :
- Créer la table `category`
- Insérer les deux catégories par défaut (Mobilier et Objet de décoration)
- Transformer la colonne `category` de Product en relation vers Category
- Migrer automatiquement vos produits existants vers les nouvelles catégories

### 2. Vérifier les données

```bash
php bin/console doctrine:query:sql "SELECT * FROM category"
```

## Utilisation de l'API

### Endpoints disponibles

#### 1. Lister toutes les catégories
```
GET /api/categories
```

Réponse :
```json
[
  {
    "id": 1,
    "name": "Mobilier",
    "slug": "mobilier",
    "description": "Meubles et éléments d'ameublement pour votre intérieur",
    "productCount": 15
  },
  {
    "id": 2,
    "name": "Objet de décoration",
    "slug": "objet-de-decoration",
    "description": "Objets décoratifs pour embellir votre espace",
    "productCount": 23
  }
]
```

#### 2. Obtenir une catégorie par slug
```
GET /api/categories/{slug}
```

Exemple :
```
GET /api/categories/mobilier
```

#### 3. Lister les catégories avec le nombre de produits
```
GET /api/categories/with-count
```

#### 4. Filtrer les produits par catégorie
```
GET /api/products?category=mobilier
```

ou

```
GET /api/products?category=objet-de-decoration
```

## Utilisation dans le code

### Backend (PHP/Symfony)

#### Créer un produit avec une catégorie :

```php
use App\Entity\Product;
use App\Entity\Category;
use App\Repository\CategoryRepository;

// Récupérer la catégorie
$category = $categoryRepository->findOneBySlug('mobilier');

// Créer le produit
$product = new Product();
$product->setName('Chaise en bois');
$product->setCategory($category);
$product->setPrice('150.00');
$product->setStock(10);

$entityManager->persist($product);
$entityManager->flush();
```

#### Récupérer les produits d'une catégorie :

```php
// Via le ProductRepository avec filtre
$products = $productRepository->findByFilters(
    page: 1,
    limit: 10,
    category: 'mobilier'
);

// Ou directement via la catégorie
$category = $categoryRepository->findOneBySlug('mobilier');
$products = $category->getProducts();
```

### Frontend (React)

#### Afficher les catégories :

```jsx
import { useState, useEffect } from 'react';

function CategoryList() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/api/categories')
      .then(res => res.json())
      .then(data => setCategories(data));
  }, []);

  return (
    <div>
      {categories.map(category => (
        <div key={category.id}>
          <h3>{category.name}</h3>
          <p>{category.description}</p>
          <span>{category.productCount} produits</span>
        </div>
      ))}
    </div>
  );
}
```

#### Filtrer les produits par catégorie :

```jsx
function ProductsByCategory({ categorySlug }) {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:8000/api/products?category=${categorySlug}`)
      .then(res => res.json())
      .then(data => setProducts(data.items));
  }, [categorySlug]);

  return (
    <div>
      {products.map(product => (
        <div key={product.id}>
          <h4>{product.name}</h4>
          <p>Catégorie : {product.category.name}</p>
          <p>Prix : {product.price}€</p>
        </div>
      ))}
    </div>
  );
}
```

## Ajouter de nouvelles catégories

Si vous souhaitez ajouter d'autres catégories à l'avenir :

### Via la console Symfony :

```php
php bin/console doctrine:query:sql "INSERT INTO category (name, slug, description) VALUES ('Nouvelle Catégorie', 'nouvelle-categorie', 'Description')"
```

### Via un controller d'administration :

Créez un contrôleur avec les permissions appropriées pour créer/modifier/supprimer des catégories.

## API Platform

Les catégories sont également exposées via API Platform, ce qui signifie que vous avez accès à :
- Documentation interactive : `http://localhost:8000/api`
- Format JSON-LD
- Possibilité de filtres et de pagination

## Structure des fichiers créés/modifiés

```
back-end/
├── src/
│   ├── Entity/
│   │   ├── Category.php          [NOUVEAU]
│   │   └── Product.php            [MODIFIÉ]
│   ├── Repository/
│   │   ├── CategoryRepository.php [NOUVEAU]
│   │   └── ProductRepository.php  [MODIFIÉ]
│   └── Controller/
│       └── CategoryController.php [NOUVEAU]
└── migrations/
    └── Version20250103000000.php  [NOUVEAU]
```

## Notes importantes

1. **Migration automatique** : La migration migre automatiquement vos produits existants vers les nouvelles catégories en fonction du texte dans l'ancien champ `category`.

2. **Slug unique** : Chaque catégorie a un slug unique qui peut être utilisé dans les URLs pour un meilleur SEO.

3. **Génération automatique du slug** : Le slug est généré automatiquement à partir du nom de la catégorie.

4. **Relation bidirectionnelle** : Vous pouvez accéder aux produits depuis une catégorie (`$category->getProducts()`) et à la catégorie depuis un produit (`$product->getCategory()`).

5. **Validation** : Les catégories sont obligatoires pour chaque produit.

## Prochaines étapes suggérées

1. Mettre à jour le frontend pour afficher les catégories
2. Créer une navigation par catégorie
3. Ajouter des filtres par catégorie sur la page boutique
4. Créer une interface d'administration pour gérer les catégories

