# Système d'Authentification Front-End

Ce document décrit le système d'authentification implémenté dans l'application Gelul.

## 📋 Vue d'ensemble

Le système d'authentification comprend :
- **AuthContext** : Gestion globale de l'état d'authentification
- **Pages de connexion/inscription** : Interfaces utilisateur pour l'authentification
- **ProtectedRoute** : Composant pour protéger les routes nécessitant une authentification
- **authService** : Service pour les appels API (avec simulation en développement)
- **Hook useAuth** : Hook personnalisé pour faciliter l'accès au contexte

## 🚀 Fonctionnalités

### ✅ Implémenté
- [x] Connexion utilisateur
- [x] Inscription utilisateur
- [x] Déconnexion
- [x] Protection des routes
- [x] Persistance de session (localStorage)
- [x] Affichage de l'utilisateur connecté dans le header
- [x] Menu utilisateur avec options
- [x] Gestion des erreurs
- [x] Validation des formulaires
- [x] Indicateur de force du mot de passe
- [x] Toggle pour afficher/masquer le mot de passe

### 🔄 À implémenter (backend requis)
- [ ] Connexion réelle avec l'API Symfony
- [ ] Réinitialisation de mot de passe
- [ ] Vérification d'email
- [ ] Mise à jour du profil utilisateur
- [ ] Rafraîchissement automatique du token

## 📁 Structure des fichiers

```
src/
├── context/
│   ├── AuthContext.jsx         # Contexte d'authentification
│   └── CartContext.jsx          # Contexte du panier (existant)
├── pages/
│   ├── Login.jsx                # Page de connexion
│   ├── Register.jsx             # Page d'inscription
│   └── ...
├── components/
│   ├── ProtectedRoute.jsx       # Composant de protection des routes
│   └── navigation/
│       └── Header.jsx           # Header avec menu utilisateur
├── services/
│   └── authService.js           # Service d'authentification API
├── hooks/
│   └── useAuth.js               # Hook personnalisé
└── App.jsx                      # Configuration des routes
```

## 🔧 Utilisation

### 1. Utiliser le contexte d'authentification

```jsx
import { useAuth } from '../hooks/useAuth'

function MyComponent() {
  const { user, isAuthenticated, login, logout } = useAuth()
  
  return (
    <div>
      {isAuthenticated ? (
        <p>Bonjour {user.name} !</p>
      ) : (
        <p>Veuillez vous connecter</p>
      )}
    </div>
  )
}
```

### 2. Protéger une route

Dans `App.jsx`, enveloppez votre route avec `ProtectedRoute` :

```jsx
<Route 
  path="/profile" 
  element={
    <ProtectedRoute>
      <ProfilePage />
    </ProtectedRoute>
  } 
/>
```

### 3. Routes d'authentification

Les routes suivantes sont disponibles :
- `/login` - Page de connexion
- `/register` - Page d'inscription

### 4. Redirections automatiques

Lorsqu'un utilisateur non connecté tente d'accéder à une route protégée :
1. Il est redirigé vers `/login`
2. Après connexion, il est automatiquement redirigé vers la page initialement demandée

## 🎨 Composants d'interface

### Login.jsx
- Formulaire avec email et mot de passe
- Toggle pour afficher/masquer le mot de passe
- Validation des champs
- Gestion des erreurs
- Lien vers l'inscription
- Lien "Mot de passe oublié" (à implémenter)

### Register.jsx
- Formulaire avec nom, email, mot de passe et confirmation
- Indicateur de force du mot de passe
- Validation en temps réel
- Acceptation des CGU
- Lien vers la connexion

### Header - Menu utilisateur
Quand l'utilisateur est connecté, le menu affiche :
- Nom et email de l'utilisateur
- Lien vers le profil
- Lien vers les favoris
- Bouton de déconnexion

## 🔐 Données persistantes

Les données suivantes sont stockées dans le `localStorage` :
- `gelul-auth-token` : Token JWT d'authentification
- `gelul-user-data` : Informations utilisateur (nom, email, etc.)

Ces données sont automatiquement chargées au démarrage de l'application.

## 🔄 Intégration avec le backend

### Configuration de l'API

Dans `src/services/authService.js`, configurez l'URL de l'API :

```javascript
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'
```

### Variables d'environnement

Créez un fichier `.env` à la racine du projet :

```env
VITE_API_URL=http://localhost:8000/api
```

### Endpoints API attendus

Le service d'authentification s'attend aux endpoints suivants :

#### POST `/auth/login`
```json
// Request
{
  "email": "user@example.com",
  "password": "password123"
}

// Response
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "url-to-avatar"
  }
}
```

#### POST `/auth/register`
```json
// Request
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe"
}

// Response
{
  "token": "jwt-token-here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": null
  }
}
```

#### GET `/auth/verify`
```
Headers: Authorization: Bearer {token}

// Response
{
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "avatar": "url-to-avatar"
  }
}
```

## 🧪 Mode développement

Actuellement, l'application fonctionne en mode "simulation" :
- Les appels API sont simulés avec des délais artificiels
- Aucun backend n'est requis pour tester l'interface
- Toutes les fonctionnalités front-end sont fonctionnelles

### Activer les vrais appels API

Dans `src/services/authService.js`, décommentez les sections marquées `// TODO` et commentez les simulations.

## 🎯 Prochaines étapes

1. **Backend Symfony** :
   - Créer les endpoints API d'authentification
   - Implémenter la génération de tokens JWT
   - Gérer les permissions et les rôles

2. **Fonctionnalités additionnelles** :
   - Page "Mot de passe oublié"
   - Vérification d'email
   - OAuth (Google, Facebook, etc.)
   - Authentification à deux facteurs

3. **Sécurité** :
   - Implémenter le rafraîchissement automatique des tokens
   - Gérer l'expiration des sessions
   - Ajouter des protections CSRF si nécessaire

## 💡 Conseils

### Tester l'authentification en développement
1. Allez sur `/register` et créez un compte avec n'importe quel email
2. Le système vous connecte automatiquement
3. Essayez d'accéder aux pages protégées (`/profile`, `/favourites`, `/payment`)
4. Déconnectez-vous via le menu utilisateur dans le header

### Simuler une erreur de connexion
Dans le mode simulation actuel :
- Utilisez le mot de passe `error` pour simuler un échec de connexion
- Utilisez un email contenant `error` pour simuler un échec d'inscription

## 🤝 Contribution

Pour modifier ou améliorer le système d'authentification :
1. Les composants UI se trouvent dans `src/pages/` et `src/components/`
2. La logique métier est dans `src/context/AuthContext.jsx`
3. Les appels API sont centralisés dans `src/services/authService.js`

## 📞 Support

Pour toute question sur l'implémentation, consultez ce document ou les commentaires dans le code source.

