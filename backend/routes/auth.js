import express from "express";
import bcrypt from "bcryptjs";
import db from "../database.js";

const router = express.Router();

router.post("/login", (req, res) => {
    const { identifiant, mdp } = req.body;

    if (!identifiant || !mdp) {
        return res.status(400).json({
            message: "Numéro étudiant et mot de passe obligatoire."
        });
    }

    const sql = `
        SELECT identifiant, mdp, admin
        FROM utilisateurs
        WHERE identifiant = ?
    `;

    db.get(sql, [identifiant], async (err, utilisateur) => {
        if (err) {
            console.error("Erreur login :", err.message);
            return res.status(500).json({
                message: "Erreur serveur."
            });
        }

        if (!utilisateur) {
            return res.status(401).json({
                message: "Identifiants incorrects."
            });
        }

        const mdpValide = await bcrypt.compare(mdp, utilisateur.mdp);      
        if (!mdpValide) {
            return res.status(401).json({
                message: "Identifiants incorrects."
            });
        }

        req.session.utilisateur = {
            identifiant: utilisateur.identifiant,
            admin: Boolean(utilisateur.admin)
        };

        return res.status(200).json({
            message: "Connexion réussie.",
            utilisateur: req.session.utilisateur
        });
    });
});

router.post("/logout", (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: "Erreur lors de la déconnexion."
            });
        }

        res.clearCookie("session_id");

        return res.status(200).json({
            message: "Déconnexion réussie."
        });
    });
});

router.get("/me", (req, res) => {
    if (!req.session || !req.session.utilisateur) {
        return res.status(401).json({
            message: "Utilisateur non connecté."
        });
    }

    return res.status(200).json({
        utilisateur: req.session.utilisateur
    });
});

export default router; 