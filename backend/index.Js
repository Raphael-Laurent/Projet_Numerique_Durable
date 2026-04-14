import sqlite3 from "sqlite3";

const sqlite = sqlite3.verbose(); // pour détailler les erreurs

const db = new sqlite.Database("..\bdd\database.sqlite", sqlite3.OPEN_READWRITE, (err) => {
    if (err) {
        console.error("Erreur connexion BDD : ", err.message);
    } else {
        console.log("Connexion réussite");
    }
});