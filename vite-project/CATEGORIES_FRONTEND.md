# Guide d'utilisation des Catégories - Frontend

## Nouveaux fichiers créés

### 1. Service API (`src/services/api.js`)

Ce fichier centralise toutes les interactions avec l'API backend. Il contient des méthodes pour :
- Catégories (`categoryAPI`)
- Produits (`productAPI`)
- Panier (`cartAPI`)
- Commandes (`orderAPI`)
- Liste de souhaits (`wishlistAPI`)

**Exemple d'utilisation :**

```javascript
import { categoryAPI, productAPI } from '../services/api'

// Récupérer toutes les catégories
const categories = await categoryAPI.getAll()

// Récupérer les produits d'une catégorie
const products = await productAPI.getByCategory('mobilier')

// Rechercher des produits
const results = await productAPI.search('chaise')
```

### 2. Composant CategoryCard (`src/components/cards/CategoryCard.jsx`)

Affiche une carte pour une catégorie avec :
- Nom de la catégorie
- Description
- Nombre de produits

**Props :**
- `category` (object) : Objet catégorie avec `id`, `name`, `slug`, `description`, `productCount`
- `onClick` (function, optionnel) : Callback lors du clic sur la carte

**Exemple d'utilisation :**

```jsx
import CategoryCard from './components/cards/CategoryCard'

<CategoryCard 
  category={{
    id: 1,
    name: 'Mobilier',
    slug: 'mobilier',
    description: 'Meubles pour votre intérieur',
    productCount: 15
  }}
  onClick={(category) => console.log('Catégorie cliquée:', category)}
/>
```

### 3. Composant CategoryFilter (`src/components/CategoryFilter.jsx`)

Affiche des boutons de filtre pour les catégories.

**Props :**
- `selectedCategory` (string) : Slug de la catégorie sélectionnée
- `onCategoryChange` (function) : Callback appelé lors du changement de catégorie
- `showProductCount` (boolean, défaut: true) : Afficher le nombre de produits

**Exemple d'utilisation :**

```jsx
import CategoryFilter from '../components/CategoryFilter'

function Shop() {
  const [selectedCategory, setSelectedCategory] = useState(null)

  return (
    <CategoryFilter 
      selectedCategory={selectedCategory}
      onCategoryChange={setSelectedCategory}
      showProductCount={true}
    />
  )
}
```

### 4. Page HomeBoutique mise à jour

La page boutique a été mise à jour pour :
- Charger les produits depuis l'API
- Filtrer par catégorie
- Gérer les états de chargement et d'erreur

## Configuration

### Variables d'environnement

Créez un fichier `.env` à la racine du projet `vite-project/` :

```env
VITE_API_URL=http://localhost:8000/api
```

Pour la production :
```env
VITE_API_URL=https://votre-domaine.com/api
```

## Hooks personnalisés

### useCategories

Un hook React personnalisé pour gérer les catégories facilement.

**Fichier :** `src/hooks/useCategories.js`

```jsx
import { useCategories } from '../hooks/useCategories'

function MyComponent() {
  const { categories, loading, error, refetch } = useCategories(true)
  
  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  
  return (
    <div>
      {categories.map(cat => (
        <div key={cat.id}>{cat.name} ({cat.productCount})</div>
      ))}
      <button onClick={refetch}>Rafraîchir</button>
    </div>
  )
}
```

### useCategory

Hook pour récupérer une catégorie spécifique par son slug.

```jsx
import { useCategory } from '../hooks/useCategories'

function CategoryDetail({ slug }) {
  const { category, loading, error } = useCategory(slug)
  
  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  if (!category) return null
  
  return (
    <div>
      <h1>{category.name}</h1>
      <p>{category.description}</p>
    </div>
  )
}
```

## Intégration dans d'autres pages

### Exemple 1 : Afficher toutes les catégories (avec hook)

```jsx
import CategoryCard from '../components/cards/CategoryCard'
import { useCategories } from '../hooks/useCategories'

function CategoriesPage() {
  const { categories, loading, error } = useCategories(true)
  
  if (loading) return <div>Chargement...</div>
  if (error) return <div>Erreur: {error}</div>
  
  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}
```

### Exemple 1b : Sans hook (utilisation directe de l'API)

```jsx
import { useState, useEffect } from 'react'
import CategoryCard from '../components/cards/CategoryCard'
import { categoryAPI } from '../services/api'

function CategoriesPage() {
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    categoryAPI.getAllWithCount()
      .then(setCategories)
      .catch(console.error)
  }, [])
  
  return (
    <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
      {categories.map(category => (
        <CategoryCard key={category.id} category={category} />
      ))}
    </div>
  )
}
```

### Exemple 2 : Filtrer les produits par catégorie

```jsx
import { useState, useEffect } from 'react'
import CategoryFilter from '../components/CategoryFilter'
import { productAPI } from '../services/api'

function ProductList() {
  const [products, setProducts] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)
  
  useEffect(() => {
    productAPI.getAll({ category: selectedCategory })
      .then(data => setProducts(data.items || data))
      .catch(console.error)
  }, [selectedCategory])
  
  return (
    <div>
      <CategoryFilter 
        selectedCategory={selectedCategory}
        onCategoryChange={setSelectedCategory}
      />
      
      <div>
        {products.map(product => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <p>Catégorie: {product.category?.name}</p>
            <p>Prix: {product.price}€</p>
          </div>
        ))}
      </div>
    </div>
  )
}
```

### Exemple 3 : Menu de navigation avec catégories

```jsx
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { categoryAPI } from '../services/api'

function CategoryMenu() {
  const [categories, setCategories] = useState([])
  
  useEffect(() => {
    categoryAPI.getAll().then(setCategories)
  }, [])
  
  return (
    <nav>
      <Link to="/boutique">Tous les produits</Link>
      {categories.map(category => (
        <Link 
          key={category.id} 
          to={`/boutique?category=${category.slug}`}
        >
          {category.name}
        </Link>
      ))}
    </nav>
  )
}
```

## Gestion de la pagination

Si vous avez beaucoup de produits, utilisez la pagination :

```jsx
const [currentPage, setCurrentPage] = useState(1)
const [totalPages, setTotalPages] = useState(1)

useEffect(() => {
  productAPI.getAll({ 
    category: selectedCategory, 
    page: currentPage,
    limit: 12 
  })
    .then(data => {
      setProducts(data.items)
      setTotalPages(Math.ceil(data.total / data.limit))
    })
}, [selectedCategory, currentPage])

// Boutons de pagination
<button onClick={() => setCurrentPage(p => p - 1)} disabled={currentPage === 1}>
  Précédent
</button>
<span>Page {currentPage} sur {totalPages}</span>
<button onClick={() => setCurrentPage(p => p + 1)} disabled={currentPage === totalPages}>
  Suivant
</button>
```

## Personnalisation du style

### CategoryCard

Vous pouvez personnaliser le composant `CategoryCard` en modifiant les styled-components dans le fichier.

### CategoryFilter

Le composant `CategoryFilter` utilise des couleurs et styles que vous pouvez adapter à votre charte graphique.

## Gestion des erreurs

Tous les composants gèrent les erreurs d'API et affichent des messages appropriés. Vous pouvez personnaliser ces messages en modifiant les composants.

## Tests

Pour tester l'intégration :

1. Démarrez le backend : `cd back-end && symfony server:start`
2. Démarrez le frontend : `cd vite-project && npm run dev`
3. Accédez à `http://localhost:5173/boutique`
4. Vérifiez que les filtres de catégories fonctionnent

## Prochaines étapes suggérées

1. **Ajouter des images aux catégories** : Modifiez l'entité Category pour inclure un champ image
2. **Créer une page dédiée par catégorie** : Route `/boutique/:categorySlug`
3. **Ajouter un breadcrumb** : Pour la navigation (Accueil > Boutique > Mobilier)
4. **Optimiser les performances** : Implémenter un cache pour les catégories
5. **Ajouter des sous-catégories** : Si nécessaire (ex: Mobilier > Chaises, Tables, etc.)

## Troubleshooting

### Les catégories ne s'affichent pas
- Vérifiez que le backend est démarré
- Vérifiez la variable `VITE_API_URL` dans `.env`
- Ouvrez la console du navigateur pour voir les erreurs

### Erreur CORS
- Vérifiez la configuration CORS dans `back-end/config/packages/nelmio_cors.yaml`

### Les produits ne se filtrent pas
- Vérifiez que les produits ont bien une catégorie assignée dans la base de données
- Vérifiez les logs du backend pour voir les requêtes SQL

