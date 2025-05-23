# SalesTraction

Projet réalisé par **Maxime ALBERT** et **Houssein GHANNOUM**  
Dans le cadre du projet de dernière année à l'ISEN, à la demande de **Catherine Bourlier**.

---

## 🎯 Objectif du projet

SalesTraction est un Proof of Concept (POC) d'une plateforme facilitant la mise en relation entre :
- **Des étudiants** (principalement en commerce/communication)
- **Des startups** souhaitant promouvoir leurs produits/services

Le but est de permettre à des étudiants de trouver des missions de prospection ou de vente pour des startups, avec un système de commission sur les ventes réalisées.

---

## 🏗️ Arborescence du projet

```
SalesTraction/
│
├── Back/                # Backend Node.js (API REST, base de données)
│   ├── server.js
│   ├── test.js
│   ├── .env.example
│   ├── README.md        # Documentation backend
│   └── ...
│
├── Front/               # Frontend React (interface utilisateur)
│   └── salestraction-project/
│       ├── src/
│       ├── public/
│       ├── package.json
│       ├── README.md    # Documentation frontend
│       └── ...
│
├── bdd/                 # Scripts SQL pour la base de données
│   ├── bdd-v1.sql
│   ├── dev_value.sql
│   ├── mcd.looping      # MCD (Modèle Conceptuel de Données), lisible avec Looping
│   └── ...
│
└── README.md            # Ce fichier (documentation globale)
```

---

## 🖥️ Logiciels requis

### Pour le **Backend** (`Back/`)
- **Node.js** (v18 ou supérieur recommandé)
- **npm** (installé avec Node.js)
- **MariaDB** ou **MySQL** (pour la base de données)

### Pour le **Frontend** (`Front/salestraction-project/`)
- **Node.js** (v16 ou supérieur)
- **npm**

### Pour la **base de données** (`bdd/`)
- Un serveur **MariaDB** ou **MySQL** pour exécuter les scripts SQL
- **Looping** (pour lire le fichier MCD fourni dans `bdd/`)

---

## 🚦 Démarrage rapide

1. **Configurer la base de données**  
   Voir les instructions dans [`bdd/`](../bdd/) et dans les README du backend.

2. **Installer et lancer le backend**  
   Voir [`Back/README.md`](./Back/README.md)

3. **Installer et lancer le frontend**  
   Voir [`Front/salestraction-project/README.md`](./Front/salestraction-project/README.md)

---

## 📄 Documentation détaillée

- [Backend (API, installation, tests)](./Back/README.md)
- [Frontend (React, installation, structure)](./Front/salestraction-project/README.md)

---

## 👥 Auteurs

- Maxime ALBERT
- Houssein GHANNOUM

Projet réalisé à l'**ISEN** pour **Catherine Bourlier** (2024).

---

## 💡 Contexte

Ce projet vise à démontrer la faisabilité d'une plateforme de mise en relation entre étudiants et startups pour des missions de prospection commerciale, avec gestion des offres, candidatures, profils et commissions.

Pour toute question, se référer aux README détaillés de chaque partie ou contacter les auteurs.