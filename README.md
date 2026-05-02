# FicheStudy — Plateforme de fiches de révision

FicheStudy est une plateforme web permettant aux étudiants ou autres de créer, consulter et réviser des fiches de cours. L'application a été conçue lors d'un projet d'éco-conception web.

## Site déployé

[URL à compléter après déploiement]

## Équipe

- Armand Labernardière
- Raphaël Laurent
- Noémie Niang
- Kevin Ojoduma-Quere
- Elias Moussa

## Stack technique

| Technologie | Rôle | Justification Green IT |
|---|---|---|
| HTML, CSS, JavaScript | Front-end | Technologies natives, aucun framework lourd, poids minimal |
| Node.js + Express | Back-end | Runtime léger, dépendances minimales |
| SQLite | Base de données | Pas de serveur dédié, embarqué dans le projet |

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
├── bdd/              # Dossier base de données (local uniquement) \
├── css/              # Feuilles de style \
├── html/             # Pages HTML \
├── javascript/       # Scripts front-end \
└── docs/             # Rapport PDF  \

