# SalesTraction Frontend

Ce projet est le frontend de l'application SalesTraction, développé avec React et Vite.

---

## 🚀 Installation & Lancement

### Prérequis

- Node.js >= 16.x
- npm >= 8.x

### Installation

1. **Cloner le dépôt**  
   ```bash
   git clone <url-du-repo>
   cd SalesTraction/Front/salestraction-project
   ```

2. **Installer les dépendances**  
   ```bash
   npm install
   ```

3. **Lancer le serveur de développement**  
   ```bash
   npm run dev
   ```
   L'application sera accessible sur [http://localhost:5173](http://localhost:5173) (ou le port affiché dans le terminal).

---

## 🗂️ Arborescence Principale

```
salestraction-project/
│
├── public/                # Fichiers statiques (favicon, etc.)
├── src/
│   ├── screens/           # Toutes les pages principales (Login, Signup, Dashboard, etc.)
│   ├── components/        # Composants réutilisables (si besoin)
│   ├── RouteHistoryContext.jsx  # Contexte pour la gestion de l'historique de navigation
│   ├── App.jsx            # Définition des routes principales
│   ├── main.jsx           # Point d'entrée React
│   ├── index.css          # Styles globaux
│   └── ...                # Autres fichiers utilitaires
├── package.json
├── vite.config.js
└── README.md
```

---

## 🧭 Navigation & Structure

- **App.jsx** : Définit toutes les routes de l'application (voir `src/screens/` pour les pages).
- **RouteHistoryContext.jsx** : Permet de garder l'historique de navigation pour certains usages UX.
- **src/screens/** : Chaque fichier correspond à une page (ex : `TalentLogin.jsx`, `ProfileStartup.jsx`, etc.).
- **src/index.css** : Styles globaux, personnalisés pour l'application.

---

## 🛠️ Développement

- **Créer une nouvelle page** : Ajouter un fichier dans `src/screens/` et référencer la route dans `App.jsx`.
- **Ajouter un composant réutilisable** : Placer dans `src/components/` et l'importer où besoin.
- **Utiliser Bootstrap** : Bootstrap est importé globalement, utilisez les classes Bootstrap dans vos composants.
- **Icônes** : Utilisez `react-icons` (ex : `react-icons/fa` pour FontAwesome).

### Bonnes pratiques

- Respecter la structure des dossiers.
- Utiliser des composants fonctionnels et hooks React.
- Préférer les routes relatives (`useNavigate`, `Link`) pour la navigation.
- Garder le style dans `index.css` ou des fichiers CSS modules si besoin de styles locaux.
- Documenter les nouveaux composants/pages.

---

## 🔄 Déploiement

Pour construire le projet pour la production :
```bash
npm run build
```
Le dossier `dist/` contiendra les fichiers prêts à être déployés sur un serveur web.

---

## 📚 Ressources utiles

- [React documentation](https://react.dev/)
- [Vite documentation](https://vitejs.dev/)
- [Bootstrap](https://getbootstrap.com/)
- [React Router](https://reactrouter.com/)
- [React Icons](https://react-icons.github.io/react-icons/)

---

## 👥 Contribution

- Forkez le projet, créez une branche, proposez vos modifications via une Pull Request.
- Merci de respecter la structure et les conventions du projet.

---

## 📝 Auteurs

- Projet CIR5 - SalesTraction
- Pour toute question, contactez l'équipe projet ou ouvrez une issue.
