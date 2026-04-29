import express from "express";
import { creerFiche, getFichesUtilisateur } from "../models/ficheModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const id_utilisateur = 1; // temporaire
    try {
        const fiches = await getFichesUtilisateur(id_utilisateur);
        res.json(fiches);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur BDD");
    }
});

router.post("/create", async (req, res) => {
    // Remplacer le 1 par l'utilisateur de session quand elle sera prête
    const id_utilisateur = req.session?.utilisateur?.num_etudiant ?? 1; 
    const { title, content, categorie } = req.body;

    if (!title || !content) {
        return res.status(400).send("Champs manquants");
    }

    try {
        await creerFiche(id_utilisateur, title, content, categorie);
        res.redirect("/fiches.html");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur BDD");
    }
});

export default router;