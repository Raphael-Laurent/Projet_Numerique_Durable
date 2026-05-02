async function chargerUtilisateurs() {
    try {
        const response = await fetch("/users/", {
            credentials: "include"
        });

        if (response.status === 403) {
            window.location.href = "/accueil.html";
            return;
        }

        const utilisateurs = await response.json();
        const tbody = document.getElementById("tableUtilisateurs");

        utilisateurs.forEach(u => {
            const tr = document.createElement("tr");
            tr.innerHTML = `
                <td>${u.identifiant}</td>
                <td>${u.admin ? "Administrateur" : "Utilisateur"}</td>
                <td>
                    ${!u.admin ? `<button onclick="rendreAdmin('${u.identifiant}')">Rendre admin</button>` : ""}
                    <button onclick="supprimerUtilisateur('${u.identifiant}')">Supprimer</button>
                </td>
            `;
            tbody.appendChild(tr);
        });
    } catch (err) {
        console.error("Erreur chargement utilisateurs :", err);
    }
}

async function supprimerUtilisateur(identifiant) {
    const confirmation = confirm(`Supprimer le compte "${identifiant}" ?`);
    if (!confirmation) return;

    const response = await fetch(`/users/${encodeURIComponent(identifiant)}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.reload();
}

async function rendreAdmin(identifiant) {
    const confirmation = confirm(`Rendre "${identifiant}" administrateur ?`);
    if (!confirmation) return;

    const response = await fetch(`/users/${encodeURIComponent(identifiant)}/admin`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        credentials: "include",
        body: JSON.stringify({ admin: true })
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.reload();
}
chargerUtilisateurs();