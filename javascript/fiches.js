fetch("/fiches/")
    .then(res => res.json()) // les fiches sont converties en json
    .then(fiches => {
        const section = document.getElementById("fiches");
        if (fiches.length === 0) {
            section.innerHTML = "<p>Aucune fiche pour le moment.</p>";
            return;
        }
        fiches.forEach(fiche => {
            const div = document.createElement("div");
            div.classList.add("fiche-card");
            div.innerHTML = `
                <strong>${fiche.titre}</strong>
                <small>${fiche.categorie ?? "Sans catégorie"}</small>
            `;
            section.appendChild(div);
        });
    })
    .catch(err => console.error("Erreur chargement fiches :", err));