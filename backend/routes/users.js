import express from "express";
import bcrypt from "bcryptjs";
import db from "../database.js";

const router = express.Router();

router.post("/register", async (req, res) => {
    const { num_etudiant, mdp, admin } = req.body;

    if (!num_etudiant || !mdp) {
        return res.status(400).json({
            message: "Numéro étudiant et mot de passe obligatoires."
        });
    }

    try {
        const mdpHash = await bcrypt.hash(mdp, 10);

        const sql = `
            INSERT INTO utilisateurs (num_etudiant, mdp, admin)
            VALUES (?, ?, ?)
        `;

        db.run(sql, [num_etudiant, mdpHash, admin ? 1 : 0], function (err) {
            if (err) {
                console.error("Erreur création compte :", err.message);

                return res.status(400).json({
                    message: "Impossible de créer le compte. Ce numéro étudiant existe peut-être déjà."
                });
            }

            return res.status(201).json({
                message: "Compte créé avec succès."
            });
        });

    } catch (error) {
        return res.status(500).json({
            message: "Erreur serveur."
        });
    }
});

router.get("/", (req, res) => {
    const sql = `
        SELECT num_etudiant, admin
        FROM utilisateurs
    `;

    db.all(sql, [], (err, utilisateurs) => {
        if (err) {
            return res.status(500).json({
                message: "Erreur serveur."
            });
        }

        return res.status(200).json(utilisateurs);
    });
});

export default router;