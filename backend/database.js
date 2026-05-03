import sqlite3 from "sqlite3";
import bcrypt from "bcryptjs";

const sqlite = sqlite3.verbose();

const db = new sqlite.Database("../database.sqlite", sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (err) => {
    if (err) {
        console.error("Erreur connexion BDD : ", err.message);
    } else {
        console.log("Connexion réussie");
        db.serialize(async () => {
            db.run(`CREATE TABLE IF NOT EXISTS utilisateurs (
                identifiant TEXT PRIMARY KEY NOT NULL UNIQUE,
                mdp TEXT NOT NULL,
                admin BOOLEAN NOT NULL DEFAULT 0
            )`);
            db.run(`CREATE TABLE IF NOT EXISTS fiches (
                id_fiche INTEGER PRIMARY KEY AUTOINCREMENT,
                id_utilisateur TEXT,
                titre TEXT NOT NULL,
                contenu TEXT NOT NULL,
                categorie TEXT,
                FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(identifiant)
            )`);
            db.run(`CREATE INDEX IF NOT EXISTS idx_fiches_utilisateur ON fiches(id_utilisateur)`);
            const mdpHash = await bcrypt.hash("admin123", 10);
            db.run(`INSERT OR IGNORE INTO utilisateurs (identifiant, mdp, admin) VALUES (?, ?, 1)`,
                ["admin", mdpHash]
            );
        });
    }
});

export default db;