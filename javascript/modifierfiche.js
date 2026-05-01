const params = new URLSearchParams(window.location.search);
const id = params.get("id");

// Pré-remplir le formulaire avec les données actuelles
fetch(`/fiches/${id}`)
    .then(res => res.json())
    .then(fiche => {
        console.log("fiche reçue :", fiche); // 👈
        document.getElementById("titre").value = fiche.titre;
        document.getElementById("categorie").value = fiche.categorie ?? "";
        document.getElementById("contenu").value = fiche.contenu;
    });

// Soumettre les modifications
document.getElementById("modifier_fiche").addEventListener("submit", (e) => {
    e.preventDefault();

    const body = new URLSearchParams({
        titre: document.getElementById("titre").value,
        contenu: document.getElementById("contenu").value,
        categorie: document.getElementById("categorie").value,
    });

    fetch(`/fiches/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: body.toString()
    })
    .then(res => {
        if (res.redirected) window.location.href = res.url;
    })
    .catch(err => console.error("Erreur :", err));
});