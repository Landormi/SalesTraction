# SalesTraction Backend

## Prérequis

- **Node.js** (version 18 ou supérieure recommandée)
- **npm** (installé avec Node.js)
- **MariaDB** ou **MySQL** (pour la base de données)

## Installation

1. **Cloner le dépôt**  
   Clonez ce projet ou récupérez les sources sur votre machine.

2. **Installer les dépendances**  
   Dans le dossier `Back`, lancez :
   ```bash
   npm install
   ```

3. **Configurer l'environnement**  
   - Copiez le fichier `.env.example` en `.env` ou `.env.development.local` selon vos besoins.
   - Renseignez les variables de connexion à la base de données, le port, le secret JWT, etc.
   - Les fichiers `.env*` sont ignorés par git (voir `.gitignore`).

4. **Préparer la base de données**  
   - Créez une base de données MariaDB/MySQL.
   - Exécutez le script SQL de structure :
     ```bash
     mysql -u <user> -p <db_name> < ../bdd/bdd-v1.sql
     ```
   - Puis le script de données de développement :
     ```bash
     mysql -u <user> -p <db_name> < ../bdd/dev_value.sql
     ```

## Lancement du serveur

Dans le dossier `Back` :

- Pour lancer en mode production :
  ```bash
  npm start
  ```
- Pour lancer en mode développement (avec redémarrage automatique) :
  ```bash
  npm run dev
  ```

## Documentation API

Une documentation Swagger est disponible à l'adresse :  
[http://localhost:3000/api/docs](http://localhost:3000/api/docs)

## Principales routes API

| Méthode | URL                                 | Description                                                                                  |
|---------|-------------------------------------|----------------------------------------------------------------------------------------------|
| POST    | `/api/auth/signup/studiant`         | Inscription d'un étudiant                                                                    |
| POST    | `/api/auth/signup/startup`          | Inscription d'une startup                                                                    |
| POST    | `/api/auth/login/studiant`          | Connexion d'un étudiant                                                                      |
| POST    | `/api/auth/login/startup`           | Connexion d'une startup                                                                      |
| GET     | `/api/profile/studiant`             | Récupérer le profil de l'étudiant connecté                                                   |
| GET     | `/api/profile/startup`              | Récupérer le profil de la startup connectée                                                  |
| PUT     | `/api/studiant`                     | Modifier le profil de l'étudiant connecté                                                    |
| PUT     | `/api/startup`                      | Modifier le profil de la startup connectée                                                   |
| POST    | `/api/offre`                        | Créer une offre (startup uniquement)                                                         |
| GET     | `/api/offre/:id`                    | Voir une offre (étudiant ou startup propriétaire)                                            |
| PUT     | `/api/offre/:id`                    | Modifier une offre (startup propriétaire uniquement)                                         |
| GET     | `/api/offre/:id/candidates`         | Voir les candidats d'une offre (startup propriétaire uniquement)                             |
| GET     | `/api/offres`                       | Lister les offres (étudiant : toutes, startup : seulement les siennes, filtres disponibles)  |
| GET     | `/api/db/test`                      | Tester la connexion à la base de données                                                     |
| GET     | `/api/docs`                         | Documentation interactive Swagger                                                            |

> Pour le détail des paramètres et des réponses, voir la documentation Swagger intégrée.

## Tests

Un script de test rapide est fourni :
```bash
npm run test
```
ou
```bash
node test.js
```
Il lance des appels API pour vérifier les principales routes.

## Notes

- Le backend utilise ES modules (`type: module` dans `package.json`).
- Les fichiers `.env`, `.env.local`, `.env.development.local`, etc. sont exclus du dépôt grâce au `.gitignore`.
- Les mots de passe sont stockés en clair pour le développement (à adapter pour la production).
- Pour toute question ou évolution, voir les commentaires dans le code et la documentation Swagger.