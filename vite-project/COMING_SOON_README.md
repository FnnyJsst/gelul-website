# Mode "Site en construction"

## Comment activer/désactiver le mode "en construction"

Le système utilise un fichier de configuration simple pour basculer entre le mode "en construction" et le site complet.

### Fichier de configuration

Le fichier `src/config/comingSoon.js` contient une variable `IS_COMING_SOON_MODE` :

- `true` = Affiche la page "Site en construction"
- `false` = Affiche le site complet avec toutes les fonctionnalités

### Pour activer le mode "en construction"

1. Ouvrez le fichier `src/config/comingSoon.js`
2. Mettez `IS_COMING_SOON_MODE = true`
3. Le site affichera uniquement la page "en construction"

### Pour restaurer le site complet

1. Ouvrez le fichier `src/config/comingSoon.js`
2. Mettez `IS_COMING_SOON_MODE = false`
3. Le site affichera toutes vos pages (HomePage, Boutique, Cart, etc.)

## Notes importantes

- ✅ **Aucun code n'est perdu** : Toutes vos routes et composants existants sont préservés
- ✅ **Changement simple** : Il suffit de modifier une seule variable
- ✅ **Facile à déployer** : Vous pouvez avoir deux versions (construction/complet) selon l'environnement

## Fichiers concernés

- `src/config/comingSoon.js` - Configuration (modifier ce fichier uniquement)
- `src/pages/ComingSoon.jsx` - Page "en construction"
- `src/App.jsx` - Application principale (ne pas modifier, déjà configurée)

