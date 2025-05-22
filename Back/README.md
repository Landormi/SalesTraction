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