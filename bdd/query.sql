CREATE TABLE IF NOT EXISTS utilisateurs (
    num_etudiant TEXT PRIMARY KEY NOT NULL UNIQUE,
    mdp TEXT NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT 0
);

CREATE TABLE IF NOT EXISTS fiches (
    id_fiche INTEGER PRIMARY KEY AUTOINCREMENT,
    id_utilisateur TEXT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    categorie TEXT,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(num_etudiant)
);

SELECT * FROM utilisateurs;
SELECT * FROM fiches;