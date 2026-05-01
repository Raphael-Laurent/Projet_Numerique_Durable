import express from "express";
// import fonction du fichier ficheModel.js
import { creerFiche, getFichesUtilisateur, getFicheById, modifierFiche, supprimerFiche } from "../models/ficheModel.js";

const router = express.Router();

router.get("/", async (req, res) => {
    const id_utilisateur = req.session?.utilisateur?.num_etudiant;
    if (!id_utilisateur) return res.status(401).json({ message: "Non connecté." });
    try {
        const fiches = await getFichesUtilisateur(id_utilisateur);
        res.json(fiches);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur BDD");
    }
});

router.post("/create", async (req, res) => {
    const id_utilisateur = req.session?.utilisateur?.num_etudiant;
    if (!id_utilisateur) return res.status(401).json({ message: "Non connecté." });
    const { titre, contenu, categorie } = req.body;

    if (!titre || !contenu) {
        return res.status(400).send("Champs manquants");
    }

    try {
        await creerFiche(id_utilisateur, titre, contenu, categorie);
        res.redirect("/html/fiches.html");
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur BDD");
    }
});

router.get("/:id", async (req, res) => {
    const id_fiche = req.params.id;
    try {
        const fiche = await getFicheById(id_fiche);
        if (!fiche) return res.status(404).send("Fiche introuvable");
        res.json(fiche);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur BDD");
    }
});

router.put("/:id", async (req, res) => {
    const id_fiche = req.params.id;
    const { titre, contenu, categorie } = req.body;

    if (!titre || !contenu) {
        return res.status(400).send("Champs manquants");
    }

    try {
        await modifierFiche(id_fiche, titre, contenu, categorie);
        res.redirect(`/html/fiche_display.html?id=${id_fiche}`);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur BDD");
    }
});

router.delete("/:id", async (req, res) => {
    const id_fiche = req.params.id;
    try {
        await supprimerFiche(id_fiche);
        res.sendStatus(200);
    } catch (err) {
        console.error(err);
        res.status(500).send("Erreur BDD");
    }
});

export default router;