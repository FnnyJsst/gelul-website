# ✅ Système de Catégories - PRÊT À UTILISER !

## 🎉 Tout est configuré !

Vous pouvez maintenant travailler sur le frontend sans avoir besoin du backend. Les données sont mockées (en dur) dans le code.

---

## 🚀 Démarrage rapide

```bash
cd vite-project
npm run dev
```

Puis ouvrez : **http://localhost:5173/boutique**

Vous verrez :
- ✅ Les filtres de catégories (Mobilier / Objet de décoration)
- ✅ 20 produits mockés
- ✅ Le filtrage fonctionne déjà
- ✅ Un indicateur "Mode Développement" en bas à droite

---

## 📊 Données disponibles

### 2 Catégories
- **Mobilier** → 8 produits
- **Objet de décoration** → 12 produits

### 20 Produits mockés
Tous les produits ont :
- Nom
- Prix
- Description
- Image
- Catégorie
- Stock

---

## 🎨 Composants créés pour vous

### 1. **CategoryFilter** - Filtre par catégories
```jsx
import CategoryFilter from '../components/CategoryFilter'

<CategoryFilter 
  selectedCategory={selectedCategory}
  onCategoryChange={setSelectedCategory}
  showProductCount={true}
/>
```

**Déjà utilisé dans** : `/boutique`

### 2. **CategoryCard** - Carte catégorie
```jsx
import CategoryCard from '../components/cards/CategoryCard'

<CategoryCard category={category} />
```

### 3. **CategoryShowcase** - Section décorative
```jsx
import CategoryShowcase from '../components/CategoryShowcase'

<CategoryShowcase />
```

**À ajouter sur** : page d'accueil si vous voulez

### 4. **DevModeIndicator** - Indicateur de mode
Petit panneau en bas à droite qui indique que vous êtes en mode développement.

**Déjà activé** partout automatiquement !

---

## 🛠️ Modifier le frontend

### Changer les couleurs

**Fichier** : `vite-project/src/components/CategoryFilter.jsx`

Ligne 21-22 :
```javascript
border: 2px solid ${props => props.active ? '#2c3e50' : '#dee2e6'};
background: ${props => props.active ? '#2c3e50' : 'white'};
```

Remplacez `#2c3e50` par votre couleur préférée !

### Changer le style des cartes produits

**Fichier** : `vite-project/src/components/cards/HomeBoutiqueCard.jsx`

Modifiez les styled-components dans ce fichier.

### Ajouter des produits mockés

**Fichier** : `vite-project/src/services/api.js`

Ligne 20+ : Ajoutez dans `MOCK_PRODUCTS` :
```javascript
{
  id: 21,
  name: 'Mon Nouveau Produit',
  category: { id: 1, name: 'Mobilier', slug: 'mobilier' },
  description: 'Super produit',
  price: '99.00',
  image: 'src/assets/images/mon-image.jpg',
  stock: 10,
  isCustomizable: false
}
```

### Changer les images

Placez vos images dans : `vite-project/src/assets/images/`

Puis dans les produits mockés, changez :
```javascript
image: 'src/assets/images/votre-nouvelle-image.jpg'
```

---

## 🔄 Passer à l'API réelle (plus tard)

Quand le backend sera prêt :

**1. Dans** `vite-project/src/services/api.js`

Ligne 4, changez :
```javascript
const USE_MOCK_DATA = false;  // ← Passez à false
```

**2. Créez** `vite-project/.env` :
```
VITE_API_URL=http://localhost:8000/api
```

**3. Démarrez le backend** :
```bash
cd back-end
php bin/console doctrine:migrations:migrate  # Si pas encore fait
symfony server:start
```

---

## 📁 Fichiers importants

### Frontend modifiables
```
vite-project/
├── src/
│   ├── services/
│   │   └── api.js ← DONNÉES MOCKÉES ICI (ligne 4 et 20+)
│   ├── components/
│   │   ├── CategoryFilter.jsx ← Filtres de catégories
│   │   ├── CategoryShowcase.jsx ← Section décorative
│   │   ├── DevModeIndicator.jsx ← Indicateur mode dev
│   │   └── cards/
│   │       ├── CategoryCard.jsx
│   │       └── HomeBoutiqueCard.jsx ← Style des cartes produits
│   ├── pages/
│   │   └── HomeBoutique.jsx ← Page boutique
│   └── hooks/
│       └── useCategories.js ← Hook React personnalisé
```

### Backend (pour plus tard)
```
back-end/
├── src/
│   ├── Entity/
│   │   ├── Category.php
│   │   └── Product.php (modifié)
│   ├── Repository/
│   │   ├── CategoryRepository.php
│   │   └── ProductRepository.php (modifié)
│   └── Controller/
│       └── CategoryController.php
└── migrations/
    └── Version20250103000000.php ← À exécuter plus tard
```

---

## 📖 Documentation complète

- **Frontend** : `vite-project/CATEGORIES_FRONTEND.md`
- **Backend** : `back-end/CATEGORIES_README.md`
- **Guide complet** : `CATEGORIES_GUIDE_COMPLET.md`
- **Données mockées** : `vite-project/MOCK_DATA_README.md`

---

## 🎯 Ce que vous pouvez faire maintenant

### ✅ Immédiatement (sans backend)
- [x] Voir les catégories fonctionner
- [x] Filtrer les produits par catégorie
- [x] Modifier le style CSS
- [x] Ajouter/modifier des produits mockés
- [x] Tester différentes mises en page
- [x] Créer de nouvelles pages

### 🔜 Plus tard (avec backend)
- [ ] Appliquer la migration Symfony
- [ ] Connecter à l'API réelle
- [ ] Gérer les vraies images des produits
- [ ] Ajouter une interface d'administration

---

## 🆘 Problèmes ?

### Les catégories ne s'affichent pas
1. Vérifiez que vous avez bien démarré le serveur : `npm run dev`
2. Vérifiez dans `src/services/api.js` que `USE_MOCK_DATA = true`
3. Ouvrez la console du navigateur (F12) pour voir les erreurs

### Je veux changer les données
Allez dans `vite-project/src/services/api.js` lignes 20-150

### Je veux enlever l'indicateur "Mode Dev"
Dans `vite-project/src/App.jsx`, supprimez la ligne :
```jsx
<DevModeIndicator />
```

---

## 🎨 Exemples de personnalisation

### Changer la couleur principale

Dans `CategoryFilter.jsx`, remplacez `#2c3e50` par votre couleur.

### Ajouter une catégorie

Dans `api.js`, ligne ~14 :
```javascript
const MOCK_CATEGORIES = [
  // ... existantes
  {
    id: 3,
    name: 'Luminaires',
    slug: 'luminaires',
    description: 'Lampes et éclairages',
    productCount: 0
  }
];
```

### Utiliser le composant CategoryShowcase

Dans votre `HomePage.jsx` :
```jsx
import CategoryShowcase from '../components/CategoryShowcase'

function HomePage() {
  return (
    <>
      {/* Votre contenu existant */}
      <CategoryShowcase />
    </>
  )
}
```

---

## ✨ Fonctionnalités

- ✅ Filtrage par catégorie
- ✅ Compteur de produits par catégorie
- ✅ Recherche (dans les données mockées)
- ✅ Pagination
- ✅ Responsive design
- ✅ Animations au survol
- ✅ Mode développement visible
- ✅ Hook React personnalisé (`useCategories`)

---

**Bon développement ! 🚀**

Vous êtes prêt·e à personnaliser votre boutique sans vous soucier du backend !

