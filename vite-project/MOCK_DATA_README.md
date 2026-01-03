# 🎨 Guide des Données Mockées

## Configuration

Dans le fichier `src/services/api.js`, vous trouverez cette ligne en haut du fichier :

```javascript
// 🔧 MODE DÉVELOPPEMENT - Mettre à true pour utiliser les données mockées
const USE_MOCK_DATA = true;
```

### Basculer entre données mockées et API réelle

- **`USE_MOCK_DATA = true`** : Utilise les données en dur (pas besoin du backend)
- **`USE_MOCK_DATA = false`** : Utilise l'API Symfony réelle

## Données Disponibles

### Catégories (2 catégories)

1. **Mobilier** (8 produits)
   - Slug: `mobilier`
   - Description: Meubles et éléments d'ameublement pour votre intérieur

2. **Objet de décoration** (12 produits)
   - Slug: `objet-de-decoration`
   - Description: Objets décoratifs pour embellir votre espace

### Produits (20 produits au total)

#### Mobilier (8 produits)
1. Banc Boiban - 390€
2. Tabouret Sertium - 190€
3. Chaise Design - 250€
4. Table Basse - 450€
5. Étagère Murale - 120€
6. Fauteuil Confort - 380€
7. Console Entrée - 280€
8. Bureau Compact - 420€

#### Objets de décoration (12 produits)
1. Pot de fleur Vinyle - 39€
2. Vase Artisanal - 65€
3. Miroir Rond - 85€
4. Cadre Photo Vintage - 28€
5. Bougeoir Design - 45€
6. Coussin Décoratif - 32€
7. Suspension Luminaire - 78€
8. Plaid Doux - 95€
9. Horloge Murale - 55€
10. Tapis Berbère - 120€
11. Panier Rangement - 42€
12. Affiche Artistique - 35€

## Ajouter vos propres données

Pour ajouter de nouveaux produits ou catégories, modifiez les constantes dans `src/services/api.js` :

### Ajouter une catégorie

```javascript
const MOCK_CATEGORIES = [
  // ... catégories existantes
  {
    id: 3,
    name: 'Luminaires',
    slug: 'luminaires',
    description: 'Lampes et éclairages',
    productCount: 5
  }
];
```

### Ajouter un produit

```javascript
const MOCK_PRODUCTS = [
  // ... produits existants
  {
    id: 21,
    name: 'Votre Nouveau Produit',
    category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
    description: 'Description de votre produit',
    price: '150.00',
    image: 'src/assets/images/votre-image.jpg',
    stock: 10,
    isCustomizable: true,
    availableColors: []
  }
];
```

## Remplacer les images

Les produits mockés utilisent actuellement 3 images :
- `src/assets/images/banc2.jpg`
- `src/assets/images/wooden-stool.jpg`
- `src/assets/images/pot.jpg`

Pour utiliser vos propres images :

1. Ajoutez vos images dans `src/assets/images/`
2. Mettez à jour le champ `image` dans les produits mockés
3. Ou utilisez des URLs complètes (ex: `https://...`)

## Fonctionnalités supportées

Les données mockées supportent :
- ✅ Filtrage par catégorie
- ✅ Recherche par nom et description
- ✅ Pagination
- ✅ Récupération par ID
- ✅ Simulation de délai réseau (300ms)

## Tester le filtrage

```javascript
// Tous les produits
const all = await productAPI.getAll();

// Produits de la catégorie Mobilier
const mobilier = await productAPI.getAll({ category: 'mobilier' });

// Recherche
const search = await productAPI.getAll({ search: 'pot' });

// Pagination
const page2 = await productAPI.getAll({ page: 2, limit: 10 });
```

## Passer en production

Quand vous êtes prêt à utiliser l'API réelle :

1. Changez `USE_MOCK_DATA = false` dans `src/services/api.js`
2. Vérifiez que votre `.env` contient la bonne URL d'API
3. Assurez-vous que le backend est démarré
4. Testez que tout fonctionne

## Notes importantes

⚠️ **N'oubliez pas** de passer `USE_MOCK_DATA` à `false` avant de déployer en production !

💡 **Astuce** : Vous pouvez utiliser une variable d'environnement pour gérer ça automatiquement :

```javascript
const USE_MOCK_DATA = import.meta.env.VITE_USE_MOCK_DATA === 'true';
```

Puis dans votre `.env` :
```
VITE_USE_MOCK_DATA=true   # pour le développement
VITE_USE_MOCK_DATA=false  # pour la production
```

