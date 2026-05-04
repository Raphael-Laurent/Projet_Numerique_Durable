# FicheStudy — Plateforme de fiches de révision

FicheStudy est une plateforme web permettant aux étudiants ou autres de créer, consulter et réviser des fiches de cours. L'application a été conçue lors d'un projet d'éco-conception web.

## Site déployé

https://fichesstudy.onrender.com

## Équipe

- Armand Labernardière : diagrammes UML, cas d'utilisation, mesures et Optimisation Green IT
- Raphaël Laurent : back-end fiches, admin et Optimisation Green IT
- Noémie Niang : back-end utilisateurs, authentification (login/logout) et admin
- Kevin Ojoduma-Quere : diagrammes UML, wireframes, mesures écologiques, correction de code et déploiements
- Elias Moussa : CSS, design de l'interface et déploiement

## Stack technique

| Technologie | Rôle | Justification Green IT |
|---|---|---|
| HTML, CSS, JavaScript | Front-end | Technologies natives, aucun framework lourd, poids minimal |
| Node.js + Express | Back-end | Runtime léger, dépendances minimales |
| SQLite | Base de données | Pas de serveur dédié, embarqué dans le projet |

## Lancer en local

**Prérequis** : Node.js installé

```bash
git clone https://github.com/Raphael-Laurent/Projet_Numerique_Durable.git
cd Projet_Numerique_Durable/backend
npm install
npm start
```

L'initialisation complète de la base de donnée est gérée automatiquement par database.js.

## Utiliser un compte admin

**Compte admin par défaut** :
- Identifiant : `admin`
- Mot de passe : `admin123`

## 📁 Structure du dépôt
├── backend/          # Serveur Node.js + Express \
│   ├── models/       # Accès base de données \
│   ├── routes/       # Routes API \
│   ├── middleware/   # Middlewares auth \
│   ├── database.js   # Connexion et initialisation BDD \
│   └── index.js      # Point d'entrée serveur \
├── frontend /        # HTML, CSS et JavaScript
    ├── css/              # Feuilles de style \
    ├── html/             # Pages HTML \
    ├── javascript/       # Scripts front-end \
└── docs/             # Rapport PDF  \

## Conventions de commit

Chaque fonctionnalité a été développée dans une branche dédiée puis fusionnée dans `main` via une Pull Request.

## Rapport

[Rapport PDF](./docs/rapport_projet_numerique_durable_GROUPE3)