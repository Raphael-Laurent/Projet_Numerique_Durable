# Projet_Numerique_Durable

Chaque branches est associée à une fonctionnalité :

- squelette : modifier le html du projet 
- css : le css du projet 
- base_donnee : mettre en place et modifier la base de donnée sqlite 
- singup : back-end pour créer un compte + front-end pour l'interface
- login/logout : back-end pour s'enregistrer ou quitter + front-end pour l'interace
- creation_fiches : back-end de création des fiches + front-end pour les inputs utilisateurs
- consultation_fiches : afficher la fiche (implémenter le trucs où on cache la fiche et où on peut la révéler petit à petit)

Le back-end en Node.js, la base de donnée en sqlite.

## Package backend à installer (node.js installé requis) :
sqlite 3 :
```
cd backend
npm install sqlite3
```

## A mettre dans gitignore :
```
backend/node_modules/
``` 