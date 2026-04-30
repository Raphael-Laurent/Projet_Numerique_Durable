const params = new URLSearchParams(window.location.search);
const id = params.get("id");

if (!id) {
    document.getElementById("fiche").innerHTML = "<p>Fiche introuvable.</p>";
} else {
    fetch(`/fiches/${id}`)
        .then(res => res.json())
        .then(fiche => {
            document.getElementById("titre").textContent = fiche.titre;
            document.getElementById("categorie").textContent = fiche.categorie ?? "Sans catégorie";
            document.getElementById("contenu").textContent = fiche.contenu;
        })
        .catch(err => console.error("Erreur :", err));
}