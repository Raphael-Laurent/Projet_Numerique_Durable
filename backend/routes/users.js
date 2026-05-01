import express from "express";
import bcrypt from "bcryptjs";
import { requireAuth, requireAdmin } from "../middleware/auth.js";
import { creerUtilisateur, getUtilisateurs, modifierUtilisateur, supprimerUtilisateur, rendreAdmin } from "../models/userModel.js";
const router = express.Router();

router.post("/register", async (req, res) => {
    const { identifiant, mdp, admin } = req.body;
    if (!identifiant || !mdp) {
        return res.status(400).json({ message: "Identifiant et mot de passe obligatoires." });
    }
    try {
        const mdpHash = await bcrypt.hash(mdp, 10);
        await creerUtilisateur(identifiant, mdpHash, admin);
        return res.status(201).json({ message: "Compte créé avec succès." });
    } catch (err) {
        console.error(err);
        return res.status(400).json({ message: "Impossible de créer le compte." });
    }
});

router.get("/", requireAdmin, async (req, res) => {
    try {
        const utilisateurs = await getUtilisateurs();
        return res.status(200).json(utilisateurs);
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

router.put("/:identifiant", requireAuth, async (req, res) => {
    const { identifiant } = req.params;
    const { mdp } = req.body;
    const utilisateurConnecte = req.session.utilisateur;

    if (utilisateurConnecte.identifiant !== identifiant && !utilisateurConnecte.admin) {
        return res.status(403).json({ message: "Accès refusé." });
    }
    if (!mdp) {
        return res.status(400).json({ message: "Mot de passe obligatoire." });
    }
    try {
        const mdpHash = await bcrypt.hash(mdp, 10);
        const changes = await modifierUtilisateur(identifiant, mdpHash);
        if (changes === 0) return res.status(404).json({ message: "Utilisateur introuvable." });
        return res.status(200).json({ message: "Compte modifié avec succès." });
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

router.put("/:identifiant/admin", requireAdmin, async (req, res) => {
    const { identifiant } = req.params;
    try {
        const changes = await rendreAdmin(identifiant);
        if (changes === 0) return res.status(404).json({ message: "Utilisateur introuvable." });
        return res.status(200).json({ message: "Utilisateur rendu administrateur avec succès." });
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

router.delete("/:identifiant", requireAdmin, async (req, res) => {
    const { identifiant } = req.params;
    try {
        const changes = await supprimerUtilisateur(identifiant);
        if (changes === 0) return res.status(404).json({ message: "Utilisateur introuvable." });
        return res.status(200).json({ message: "Compte supprimé avec succès." });
    } catch (err) {
        return res.status(500).json({ message: "Erreur serveur." });
    }
});

export default router;