import db from "../database.js";

export function creerUtilisateur(identifiant, mdpHash, admin = false) {
    return new Promise((resolve, reject) => {
        const sql = `INSERT INTO utilisateurs (identifiant, mdp, admin) VALUES (?, ?, ?)`;
        db.run(sql, [identifiant, mdpHash, admin ? 1 : 0], function (err) {
            if (err) reject(err);
            else resolve(this.lastID);
        });
    });
}

export function getUtilisateurs() {
    return new Promise((resolve, reject) => {
        const sql = `SELECT identifiant, admin FROM utilisateurs`;
        db.all(sql, [], (err, rows) => {
            if (err) reject(err);
            else resolve(rows);
        });
    });
}

export function getUtilisateurById(identifiant) {
    return new Promise((resolve, reject) => {
        const sql = `SELECT identifiant, admin FROM utilisateurs WHERE identifiant = ?`;
        db.get(sql, [identifiant], (err, row) => {
            if (err) reject(err);
            else resolve(row);
        });
    });
}

export function modifierUtilisateur(identifiant, mdpHash) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE utilisateurs SET mdp = ? WHERE identifiant = ?`;
        db.run(sql, [mdpHash, identifiant], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}

export function supprimerUtilisateur(identifiant) {
    return new Promise((resolve, reject) => {
        const sql = `DELETE FROM utilisateurs WHERE identifiant = ?`;
        db.run(sql, [identifiant], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}

export function rendreAdmin(identifiant) {
    return new Promise((resolve, reject) => {
        const sql = `UPDATE utilisateurs SET admin = 1 WHERE identifiant = ?`;
        db.run(sql, [identifiant], function (err) {
            if (err) reject(err);
            else resolve(this.changes);
        });
    });
}