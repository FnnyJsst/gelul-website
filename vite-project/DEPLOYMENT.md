# Guide de déploiement pour gelul.fr

Ce guide vous explique comment héberger votre site React sur gelul.fr.

## 📋 Prérequis

Avant de commencer, vous devez avoir :
- ✅ Votre domaine gelul.fr configuré et pointant vers votre hébergeur
- ✅ Un accès à votre hébergeur (SSH, FTP, ou panneau de contrôle)
- ✅ Node.js installé sur votre machine locale (pour le build)

---

## 🚀 Étape 1 : Préparer le build de production

### 1.1 Installer les dépendances (si nécessaire)

```bash
cd vite-project
npm install
```

### 1.2 Créer le build de production

```bash
npm run build
```

Cette commande va créer un dossier `dist` contenant tous les fichiers optimisés pour la production.

### 1.3 Vérifier le build localement (optionnel)

```bash
npm run preview
```

Cela vous permet de tester le site en production localement avant de le déployer.

---

## 🌐 Étape 2 : Choisir votre méthode d'hébergement

Vous avez plusieurs options pour héberger votre site. Choisissez celle qui correspond à votre situation :

### Option A : Hébergement traditionnel (Apache/Nginx) ⭐ Recommandé pour débutants

**Pour qui ?** Si vous avez un hébergement classique (OVH, O2Switch, etc.)

**Avantages :**
- Simple et direct
- Contrôle total sur votre serveur
- Pas besoin de services externes

[Voir les instructions détaillées →](#option-a-hébergement-traditionnel-apachenginx)

---

### Option B : Netlify (Gratuit) ⭐ Le plus simple

**Pour qui ?** Débutants qui veulent un déploiement ultra-rapide

**Avantages :**
- Gratuit pour commencer
- Déploiement en quelques clics
- HTTPS automatique
- CDN intégré

[Voir les instructions détaillées →](#option-b-netlify-gratuit-et-simple)

---

### Option C : Vercel (Gratuit)

**Pour qui ?** Développeurs qui veulent un déploiement via Git

**Avantages :**
- Gratuit
- Intégration Git automatique
- Déploiement automatique à chaque commit

[Voir les instructions détaillées →](#option-c-vercel-gratuit-avec-git)

---

### Option D : GitHub Pages (Gratuit)

**Pour qui ?** Si votre code est déjà sur GitHub

**Avantages :**
- Gratuit
- Intégré à GitHub
- Simple à configurer

[Voir les instructions détaillées →](#option-d-github-pages-gratuit)

---

## 📝 Option A : Hébergement traditionnel (Apache/Nginx)

### A.1 Uploader les fichiers

1. **Ouvrez votre client FTP** (FileZilla, Cyberduck, etc.)
2. **Connectez-vous à votre serveur** avec vos identifiants
3. **Naviguez vers le dossier public** (généralement `public_html`, `www`, ou `htdocs`)
4. **Supprimez les anciens fichiers** s'il y en a (attention aux sauvegardes !)
5. **Uploadez TOUT le contenu du dossier `dist`** (pas le dossier `dist` lui-même, mais son contenu)

### A.2 Configuration Apache

Si votre serveur utilise Apache, le fichier `.htaccess` est déjà inclus dans le dossier `dist` après le build.

**Points importants :**
- Le fichier `.htaccess` gère automatiquement le routage React Router
- Toutes les routes redirigent vers `index.html`
- Les fichiers statiques sont servis normalement

### A.3 Configuration Nginx

Si votre serveur utilise Nginx, ajoutez cette configuration dans votre fichier de configuration de site :

```nginx
server {
    listen 80;
    server_name gelul.fr www.gelul.fr;
    
    root /chemin/vers/votre/dossier/public_html;
    index index.html;

    # Gestion du routage React
    location / {
        try_files $uri $uri/ /index.html;
    }

    # Cache pour les fichiers statiques
    location ~* \.(jpg|jpeg|png|gif|ico|css|js|svg|woff|woff2|ttf|eot)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

### A.4 Vérifier le déploiement

1. Visitez `http://gelul.fr` (ou `https://gelul.fr` si vous avez configuré SSL)
2. Vérifiez que la page "en construction" s'affiche correctement
3. Testez que les images et les styles se chargent bien

---

## 📝 Option B : Netlify (Gratuit et simple)

### B.1 Créer un compte Netlify

1. Allez sur [netlify.com](https://www.netlify.com)
2. Créez un compte gratuit (vous pouvez utiliser GitHub, GitLab, ou email)

### B.2 Déployer le site

**Méthode 1 : Glisser-déposer (la plus simple)**

1. Dans le dashboard Netlify, cliquez sur "Add new site" → "Deploy manually"
2. Glissez-déposez le dossier `dist` complet
3. Netlify va déployer votre site automatiquement

**Méthode 2 : Via Git (recommandé pour les mises à jour)**

1. Poussez votre code sur GitHub/GitLab/Bitbucket
2. Dans Netlify, cliquez sur "Add new site" → "Import an existing project"
3. Connectez votre dépôt Git
4. Configurez :
   - **Build command :** `cd vite-project && npm install && npm run build`
   - **Publish directory :** `vite-project/dist`

### B.3 Configurer le domaine personnalisé

1. Dans Netlify, allez dans **Site settings** → **Domain management**
2. Cliquez sur **Add custom domain**
3. Entrez `gelul.fr`
4. Suivez les instructions pour configurer les DNS :
   - Ajoutez un enregistrement CNAME ou A selon les instructions Netlify
   - Configurez dans les paramètres DNS de votre domaine

### B.4 Configurer HTTPS (automatique)

Netlify configure automatiquement HTTPS gratuit pour votre domaine. Cela prend généralement quelques minutes.

---

## 📝 Option C : Vercel (Gratuit avec Git)

### C.1 Créer un compte Vercel

1. Allez sur [vercel.com](https://vercel.com)
2. Créez un compte avec GitHub, GitLab, ou Bitbucket

### C.2 Déployer le site

1. Cliquez sur **Add New Project**
2. Importez votre dépôt Git
3. Configurez :
   - **Framework Preset :** Vite
   - **Root Directory :** `vite-project`
   - **Build Command :** `npm run build`
   - **Output Directory :** `dist`

### C.3 Configurer le domaine

1. Dans les paramètres du projet, allez dans **Domains**
2. Ajoutez `gelul.fr`
3. Configurez les DNS selon les instructions Vercel

---

## 📝 Option D : GitHub Pages (Gratuit)

### D.1 Préparer le dépôt

1. Poussez votre code sur GitHub si ce n'est pas déjà fait

### D.2 Configurer GitHub Actions

Un fichier de workflow GitHub Actions est créé automatiquement pour vous.

### D.3 Activer GitHub Pages

1. Dans votre dépôt GitHub, allez dans **Settings** → **Pages**
2. Configurez :
   - **Source :** GitHub Actions
   - **Branch :** main (ou votre branche principale)

### D.4 Configurer le domaine personnalisé

1. Créez un fichier `CNAME` à la racine avec le contenu : `gelul.fr`
2. Dans les paramètres DNS de votre domaine, ajoutez :
   - Type : `CNAME`
   - Name : `@` (ou laissez vide selon votre fournisseur)
   - Value : `votre-username.github.io`

---

## 🔧 Configuration du domaine gelul.fr

### Configuration DNS

Quelle que soit l'option choisie, vous devrez configurer les DNS de votre domaine :

#### Pour un hébergement traditionnel :
- **Type A :** Point vers l'IP de votre serveur
- **Type CNAME :** `www` vers `gelul.fr`

#### Pour Netlify :
- **Type A ou CNAME :** Suivez les instructions dans le dashboard Netlify

#### Pour Vercel :
- **Type A ou CNAME :** Suivez les instructions dans le dashboard Vercel

#### Pour GitHub Pages :
- **Type CNAME :** Point vers `votre-username.github.io`

---

## 🔒 Activer HTTPS (SSL)

### Option automatique (recommandé)
- **Netlify/Vercel/GitHub Pages :** HTTPS est automatique et gratuit
- **Let's Encrypt :** Pour les hébergements traditionnels, configurez Let's Encrypt (gratuit)

### Pour un hébergement traditionnel :

1. Installez certbot (si ce n'est pas déjà fait)
2. Générez le certificat SSL :
```bash
sudo certbot --apache -d gelul.fr -d www.gelul.fr
```

---

## ✅ Vérification finale

Après le déploiement, vérifiez :

- [ ] Le site s'affiche sur `https://gelul.fr`
- [ ] Le certificat SSL est actif (cadenas vert)
- [ ] La page "en construction" s'affiche correctement
- [ ] Les images et styles se chargent
- [ ] Le site fonctionne sur mobile

---

## 🔄 Mettre à jour le site

### Pour hébergement traditionnel :
1. Faites un nouveau build : `npm run build`
2. Uploadez les nouveaux fichiers via FTP

### Pour Netlify/Vercel :
1. Poussez vos modifications sur Git
2. Le déploiement se fait automatiquement

---

## 🆘 Problèmes courants

### Le site affiche une page blanche
- Vérifiez que tous les fichiers du dossier `dist` sont uploadés
- Vérifiez la console du navigateur pour les erreurs
- Assurez-vous que le fichier `.htaccess` est présent (pour Apache)

### Les routes ne fonctionnent pas (erreur 404)
- Vérifiez la configuration du serveur pour le routage React
- Pour Apache, le fichier `.htaccess` devrait gérer cela
- Pour Nginx, vérifiez la configuration `try_files`

### Le site fonctionne en HTTP mais pas en HTTPS
- Vérifiez que le certificat SSL est correctement installé
- Vérifiez que les URLs dans le code utilisent des chemins relatifs

---

## 📞 Besoin d'aide ?

Si vous rencontrez des problèmes :
1. Vérifiez les logs d'erreur de votre hébergeur
2. Vérifiez la console du navigateur (F12)
3. Contactez le support de votre hébergeur

