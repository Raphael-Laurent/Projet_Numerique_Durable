import db from "../database.js";

// export const getFichesByUser ...
export function creerFiche(id_utilisateur, titre, contenu, categorie = null) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO fiches (id_utilisateur, titre, contenu, categorie) 
                     VALUES (?, ?, ?, ?)`;
        db.run(sql, [id_utilisateur, titre, contenu, categorie], function (err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
}

//export const createFiche ...
export function getFichesUtilisateur(id_utilisateur) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT id_fiche, titre, categorie FROM fiches WHERE id_utilisateur = ?`;
        db.all(sql, [id_utilisateur], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export function getFicheById(id_fiche) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT * FROM fiches WHERE id_fiche = ?`;
        db.get(sql, [id_fiche], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

export function modifierFiche(id_fiche, titre, contenu, categorie = null) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE fiches SET titre = ?, contenu = ?, categorie = ? WHERE id_fiche = ?`;
        db.run(sql, [titre, contenu, categorie, id_fiche], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}