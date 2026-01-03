# 🧭 Guide du Breadcrumb (Fil d'Ariane)

## Qu'est-ce qu'un breadcrumb ?

Un breadcrumb (fil d'Ariane) est un élément de navigation qui montre le chemin de la page actuelle :

```
🏠 › Boutique › Mobilier
```

## ✅ Déjà implémenté

Le breadcrumb est maintenant actif sur la page `/boutique` !

Il affiche :
- **`🏠 › Boutique › Tous les produits`** (par défaut)
- **`🏠 › Boutique › Mobilier`** (quand vous filtrez par Mobilier)
- **`🏠 › Boutique › Objet de décoration`** (quand vous filtrez)

## 🎨 Utilisation du composant

### Exemple basique

```jsx
import Breadcrumb from '../components/Breadcrumb'

<Breadcrumb 
  items={[
    { label: 'Boutique', onClick: () => navigate('/boutique') },
    { label: 'Mobilier' }  // Dernier élément = page actuelle
  ]} 
  showHome={true}
/>
```

### Avec plusieurs niveaux

```jsx
<Breadcrumb 
  items={[
    { label: 'Boutique', onClick: () => navigate('/boutique') },
    { label: 'Mobilier', onClick: () => setCategory('mobilier') },
    { label: 'Tables', onClick: () => setSubCategory('tables') },
    { label: 'Table Basse Scandinave' }  // Page actuelle
  ]} 
/>
```

## 📝 Structure des items

Chaque élément du breadcrumb est un objet avec :

```javascript
{
  label: 'Nom affiché',      // Requis
  onClick: () => {},         // Optionnel - Si absent, non cliquable
}
```

## 🔧 Props du composant Breadcrumb

| Prop | Type | Défaut | Description |
|------|------|--------|-------------|
| `items` | Array | `[]` | Tableau d'éléments du breadcrumb |
| `showHome` | Boolean | `true` | Afficher l'icône 🏠 au début |

## 🎨 Personnalisation

### Changer le séparateur

Dans `Breadcrumb.jsx`, ligne 50 :
```jsx
<Separator>›</Separator>  // Changez › par > ou / ou •
```

### Changer les couleurs

```jsx
const BreadcrumbLink = styled.button`
  color: #2c3e50;  // ← Votre couleur
  
  &:hover {
    color: #667eea;  // ← Couleur au survol
  }
`
```

### Changer l'icône home

Ligne 68 :
```jsx
<HomeIcon>🏠</HomeIcon>  // Changez l'emoji ou utilisez une icône
```

## 🚀 Exemples avancés

### Page produit

```jsx
function ProductPage({ productId }) {
  const [product, setProduct] = useState(null)
  
  const breadcrumbItems = [
    { label: 'Boutique', onClick: () => navigate('/boutique') },
    { 
      label: product?.category.name, 
      onClick: () => navigate(`/boutique?category=${product?.category.slug}`) 
    },
    { label: product?.name }
  ]
  
  return (
    <div>
      <Breadcrumb items={breadcrumbItems} />
      {/* Contenu de la page */}
    </div>
  )
}
```

### Avec sous-catégories (futur)

```jsx
function ShopPage() {
  const [category, setCategory] = useState(null)
  const [subCategory, setSubCategory] = useState(null)
  
  const breadcrumbItems = [
    { label: 'Boutique', onClick: () => {
      setCategory(null)
      setSubCategory(null)
    }}
  ]
  
  if (category) {
    breadcrumbItems.push({
      label: category.name,
      onClick: () => setSubCategory(null)
    })
  }
  
  if (subCategory) {
    breadcrumbItems.push({
      label: subCategory.name
    })
  } else {
    breadcrumbItems.push({
      label: 'Tous les produits'
    })
  }
  
  return <Breadcrumb items={breadcrumbItems} />
}
```

### Navigation depuis un panier

```jsx
<Breadcrumb 
  items={[
    { label: 'Boutique', onClick: () => navigate('/boutique') },
    { label: 'Panier', onClick: () => navigate('/cart') },
    { label: 'Paiement' }
  ]} 
/>
```

## 🎯 Ajouter des sous-catégories (plus tard)

Actuellement : **Boutique > Mobilier**

Pour avoir : **Boutique > Mobilier > Tables > Table Basse**

### Étape 1 : Créer l'entité SubCategory (Backend)

```php
// back-end/src/Entity/SubCategory.php
#[ORM\Entity]
class SubCategory
{
    #[ORM\ManyToOne(targetEntity: Category::class)]
    private ?Category $category = null;
    
    #[ORM\Column]
    private ?string $name = null;
    
    // ...
}
```

### Étape 2 : Ajouter dans les données mockées

```javascript
// vite-project/src/services/api.js
const MOCK_SUB_CATEGORIES = [
  { id: 1, name: 'Tables', categoryId: 1 },
  { id: 2, name: 'Chaises', categoryId: 1 },
  { id: 3, name: 'Vases', categoryId: 2 },
  // ...
]
```

### Étape 3 : Mettre à jour le breadcrumb

```jsx
const breadcrumbItems = [
  { label: 'Boutique', onClick: () => resetFilters() }
]

if (category) {
  breadcrumbItems.push({
    label: category.name,
    onClick: () => setSubCategory(null)
  })
  
  if (subCategory) {
    breadcrumbItems.push({
      label: subCategory.name
    })
  }
}
```

## 🎨 Variantes de style

### Style minimal

```jsx
const BreadcrumbContainer = styled.nav`
  padding: 1rem 0;
  font-size: 0.85rem;
  color: #666;
  background: transparent;  // Pas de fond
  border-radius: 0;
`
```

### Style avec arrière-plan foncé

```jsx
const BreadcrumbContainer = styled.nav`
  background: #2c3e50;
  color: white;
  
  // Puis ajustez les couleurs des liens
`
```

### Avec icônes pour chaque niveau

```jsx
const CATEGORY_ICONS = {
  'mobilier': '🪑',
  'objet-de-decoration': '🎨',
  'tables': '🪑',
  'chaises': '💺',
}

// Dans le breadcrumb
{item.icon && <span>{CATEGORY_ICONS[item.slug]}</span>}
{item.label}
```

## ♿ Accessibilité

Le composant Breadcrumb inclut déjà :
- ✅ `aria-label="Fil d'Ariane"`
- ✅ `aria-current="page"` sur la page actuelle
- ✅ `aria-label` sur le bouton home
- ✅ Navigation au clavier (Tab, Enter)
- ✅ Indicateur de focus visible

## 📱 Responsive

Le breadcrumb s'adapte automatiquement :
- `flex-wrap: wrap` permet le retour à la ligne
- Taille de police ajustée pour mobile

Pour optimiser sur mobile :

```jsx
const BreadcrumbContainer = styled.nav`
  @media (max-width: 768px) {
    padding: 0.5rem 1rem;
    font-size: 0.8rem;
  }
`
```

## 💡 Conseils

1. **Dernier élément** : Toujours le dernier élément du breadcrumb = page actuelle (non cliquable)

2. **Évitez trop de niveaux** : Maximum 4-5 niveaux pour une bonne UX

3. **Cohérence** : Utilisez le même breadcrumb sur toutes les pages de la boutique

4. **URLs** : Gardez le breadcrumb synchronisé avec l'URL (query params)

## 🔍 Exemple complet avec URL params

```jsx
import { useSearchParams } from 'react-router-dom'

function HomeBoutique() {
  const [searchParams, setSearchParams] = useSearchParams()
  const category = searchParams.get('category')
  
  const handleCategoryClick = (slug) => {
    if (slug) {
      setSearchParams({ category: slug })
    } else {
      setSearchParams({})
    }
  }
  
  const breadcrumbItems = [
    { label: 'Boutique', onClick: () => handleCategoryClick(null) }
  ]
  
  if (category) {
    breadcrumbItems.push({ label: getCategoryName(category) })
  } else {
    breadcrumbItems.push({ label: 'Tous les produits' })
  }
  
  return <Breadcrumb items={breadcrumbItems} />
}
```

## 🎉 Résultat

Vous avez maintenant un breadcrumb fonctionnel qui :
- ✅ Affiche le chemin de navigation
- ✅ Permet de revenir en arrière
- ✅ S'adapte aux catégories
- ✅ Est accessible
- ✅ Est personnalisable

**Testez-le sur `/boutique` !** 🚀

