# 🛍️ Système de Catégories - Résumé

Bonjour Fanny ! 👋

J'ai créé un système complet de catégories pour votre boutique.

## ✅ C'est fait !

Vous avez maintenant **2 catégories** :
1. **Mobilier** (8 produits)
2. **Objet de décoration** (12 produits)

## 🎨 Pour tester immédiatement

```bash
cd vite-project
npm run dev
```

Puis allez sur : **http://localhost:5173/boutique**

Vous verrez les filtres de catégories en haut de page. Cliquez dessus pour filtrer !

## 💡 Comment ça marche

**Les données sont en dur** pour l'instant (pas besoin du backend PHP).

Dans le fichier `vite-project/src/services/api.js`, ligne 4 :
```javascript
const USE_MOCK_DATA = true;  // ← Les données sont mockées
```

## 📝 Pour modifier les produits

**Fichier** : `vite-project/src/services/api.js`

Lignes 20 à 150 : Vous trouverez tous les produits mockés.

**Exemple - ajouter un produit** :
```javascript
{
  id: 21,
  name: 'Ma Lampe',
  category: { id: 2, name: 'Objet de décoration', slug: 'objet-de-decoration' },
  description: 'Jolie lampe design',
  price: '75.00',
  image: 'src/assets/images/lampe.jpg',
  stock: 5,
  isCustomizable: false
}
```

## 🎨 Pour changer les couleurs

**Fichier** : `vite-project/src/components/CategoryFilter.jsx`

Ligne 21-22 : Changez `#2c3e50` par la couleur de votre choix

## 📦 Ce qui a été créé

### Backend (à utiliser plus tard)
- ✅ Entité Category
- ✅ Controller pour l'API
- ✅ Migration base de données
- ✅ Repository avec méthodes de filtre

### Frontend (utilisable tout de suite)
- ✅ Service API avec données mockées
- ✅ Composant CategoryFilter (filtres)
- ✅ Composant CategoryCard (cartes)
- ✅ Composant CategoryShowcase (section déco)
- ✅ Hook useCategories (pour faciliter)
- ✅ Page boutique mise à jour
- ✅ Indicateur mode développement

## 🔄 Quand connecter au backend ?

Plus tard, quand vous serez prête :

1. Changez `USE_MOCK_DATA = false` dans `api.js`
2. Lancez la migration : `php bin/console doctrine:migrations:migrate`
3. Démarrez le backend : `symfony server:start`

## 📚 Documentation

J'ai créé plusieurs fichiers d'aide :

- **`PRET_A_UTILISER.md`** ← Guide rapide (ce fichier)
- **`CATEGORIES_GUIDE_COMPLET.md`** ← Tout en détail
- **`vite-project/MOCK_DATA_README.md`** ← Comment modifier les données
- **`vite-project/CATEGORIES_FRONTEND.md`** ← Exemples d'utilisation
- **`back-end/CATEGORIES_README.md`** ← Documentation backend

## 🎯 Prochaines étapes suggérées

1. **Testez** : Lancez `npm run dev` et allez sur `/boutique`
2. **Personnalisez** : Changez les couleurs, ajoutez des produits
3. **Créez** : Utilisez CategoryShowcase sur la page d'accueil
4. **Plus tard** : Connectez au backend quand vous voulez

## 💬 Questions fréquentes

**Q : Comment ajouter une image à un produit ?**  
R : Mettez l'image dans `vite-project/src/assets/images/` et changez le champ `image` dans les données mockées

**Q : Je veux enlever le panneau "Mode Développement" en bas à droite ?**  
R : Dans `App.jsx`, supprimez `<DevModeIndicator />`

**Q : Comment ajouter une 3e catégorie ?**  
R : Dans `api.js`, ajoutez-la dans `MOCK_CATEGORIES` (ligne ~8)

**Q : Les images ne s'affichent pas ?**  
R : Vérifiez que le chemin est correct, ou utilisez des URLs complètes

## 🎉 Résultat

Vous avez maintenant une boutique avec :
- ✅ Filtrage par catégorie fonctionnel
- ✅ 20 produits d'exemple
- ✅ Design responsive et moderne
- ✅ Compteur de produits par catégorie
- ✅ Tout personnalisable facilement

**Bon développement ! 🚀**

N'hésitez pas si vous avez des questions !

