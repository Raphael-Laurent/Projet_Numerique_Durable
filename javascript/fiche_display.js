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

            const contenuEl = document.getElementById("contenu");
            const phrases = fiche.contenu.match(/[^.!?]+[.!?]+/g) ?? [fiche.contenu];
            phrases.forEach(phrase => {
                const span = document.createElement("span");
                span.classList.add("phrase");
                span.textContent = phrase;
                span.addEventListener("click", () => {
                    if (span.classList.contains("cachee")) {
                        span.classList.remove("cachee");
                    }
                });
                contenuEl.appendChild(span);
            });

            document.getElementById("btn-revision").addEventListener("click", () => {
                const phrases = document.querySelectorAll(".phrase");
                const modeActif = document.getElementById("btn-revision").classList.toggle("actif");
                phrases.forEach(p => {
                    if (modeActif) {
                        p.classList.add("cachee");
                    } else {
                        p.classList.remove("cachee");
                    }
                });
            });
        })
        .catch(err => console.error("Erreur :", err));
}