CREATE TABLE IF NOT EXISTS utilisateurs (
    identifiant TEXT PRIMARY KEY NOT NULL UNIQUE,
    mdp TEXT NOT NULL,
    admin BOOLEAN NOT NULL DEFAULT 0
)

CREATE TABLE IF NOT EXISTS fiches (
    id_fiche INTEGER PRIMARY KEY AUTOINCREMENT,
    id_utilisateur TEXT,
    titre TEXT NOT NULL,
    contenu TEXT NOT NULL,
    categorie TEXT,
    FOREIGN KEY (id_utilisateur) REFERENCES utilisateurs(identifiant)
);

CREATE INDEX IF NOT EXISTS idx_fiches_utilisateur 
ON fiches(id_utilisateur);