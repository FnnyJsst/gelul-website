# 🚀 Guide de Démarrage Rapide - Authentification

## En 5 minutes, testez le système d'authentification !

### 1️⃣ Démarrez l'application

```bash
cd vite-project
npm run dev
```

### 2️⃣ Testez l'inscription

1. Ouvrez votre navigateur sur `http://localhost:5173`
2. Cliquez sur l'icône de profil (en haut à droite)
3. Vous êtes redirigé vers `/login`
4. Cliquez sur "Créer un compte"
5. Remplissez le formulaire avec n'importe quelles données :
   - Nom : Jean Dupont
   - Email : jean@example.com
   - Mot de passe : monmotdepasse
   - Confirmez le mot de passe
   - Acceptez les CGU
6. Cliquez sur "S'inscrire"

✅ Vous êtes maintenant connecté !

### 3️⃣ Explorez les fonctionnalités

Une fois connecté, vous pouvez :

- **Voir votre profil** : Cliquez sur l'icône de profil → Menu déroulant
- **Accéder aux pages protégées** :
  - `/profile` - Votre profil
  - `/favourites` - Vos favoris
  - `/payment` - Page de paiement
- **Vous déconnecter** : Cliquez sur "Déconnexion" dans le menu

### 4️⃣ Testez la protection des routes

1. Déconnectez-vous
2. Essayez d'accéder à `/profile` directement
3. Vous êtes redirigé vers `/login`
4. Après connexion, vous revenez automatiquement sur `/profile` !

### 5️⃣ Testez la récupération de mot de passe

1. Sur la page de connexion, cliquez sur "Mot de passe oublié ?"
2. Entrez votre email
3. Cliquez sur "Envoyer le lien"
4. Une simulation vous montre le message de succès !

## 🎨 Pages disponibles

| Route | Description | Protection |
|-------|-------------|------------|
| `/login` | Connexion | Public |
| `/register` | Inscription | Public |
| `/forgot-password` | Mot de passe oublié | Public |
| `/profile` | Profil utilisateur | Protégé ⚠️ |
| `/favourites` | Favoris | Protégé ⚠️ |
| `/payment` | Paiement | Protégé ⚠️ |

## 🔐 Données de test

En mode développement (sans backend), vous pouvez utiliser n'importe quelles données.

### Simuler des erreurs

Pour tester la gestion des erreurs :

**Connexion :**
- Email : n'importe lequel
- Mot de passe : `error` → simule une erreur de connexion

**Inscription :**
- Email contenant `error` (ex: `error@example.com`) → simule une erreur d'inscription

## 🔧 Configuration (optionnel)

### Variables d'environnement

Créez un fichier `.env` à la racine de `vite-project/` :

```env
# URL de l'API Backend (quand il sera prêt)
VITE_API_URL=http://localhost:8000/api
```

Par défaut, l'application fonctionne en mode simulation (pas de backend requis).

## 📱 Responsive

Le système d'authentification est entièrement responsive :
- ✅ Desktop
- ✅ Tablette
- ✅ Mobile

## 🐛 Débogage

### Voir les données stockées

Ouvrez la console du navigateur (F12) :

```javascript
// Voir le token
localStorage.getItem('gelul-auth-token')

// Voir les données utilisateur
localStorage.getItem('gelul-user-data')

// Effacer toutes les données
localStorage.clear()
```

### Réinitialiser complètement

Si vous rencontrez des problèmes :

1. Ouvrez la console (F12)
2. Tapez : `localStorage.clear()`
3. Rechargez la page (F5)

## 🎯 Prochaine étape : Connecter le backend

Consultez le fichier `AUTHENTICATION.md` pour :
- Configurer l'API Symfony
- Activer les vrais appels API
- Implémenter les endpoints manquants

## ❓ Questions fréquentes

**Q : Mes données de connexion sont-elles sûres ?**  
A : En mode développement, les données sont simulées localement. En production, elles seront sécurisées via HTTPS et JWT.

**Q : Où sont stockées mes données ?**  
A : Dans le localStorage de votre navigateur, uniquement sur votre machine.

**Q : Puis-je utiliser plusieurs comptes ?**  
A : En mode simulation, vous pouvez créer plusieurs comptes, mais seul le dernier reste actif.

**Q : Le mot de passe est-il sécurisé ?**  
A : En production, les mots de passe seront hashés côté backend. En développement, ils sont simulés.

## 🤝 Besoin d'aide ?

Consultez :
- `AUTHENTICATION.md` - Documentation complète
- Code source dans `src/context/AuthContext.jsx`
- Service API dans `src/services/authService.js`

---

**🎉 Bon développement avec Gelul !**

