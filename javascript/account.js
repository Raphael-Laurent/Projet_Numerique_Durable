async function afficherCompte() {
    try {
        const response = await fetch("/api/auth/me", {
            method: "GET",
            credentials: "include"
        });

        if (!response.ok) {
            window.location.href = "/login.html";
            return;
        }

        const data = await response.json();

        document.getElementById("identifiant").textContent = data.utilisateur.identifiant;
        document.getElementById("roleUtilisateur").textContent = data.utilisateur.admin ? "Administrateur" : "Utilisateur";

    } catch (error) {
        window.location.href = "/login.html";
    }
}

afficherCompte();

document.getElementById("modifyAccountBtn").addEventListener("click", () => {
    window.location.href = "/modifiercompte.html";
});

document.getElementById("deleteAccountBtn").addEventListener("click", async () => {
    const confirmation = confirm("Êtes-vous sûr de vouloir supprimer votre compte ?");
    if (!confirmation) return;

    const response = await fetch(`/users/${encodeURIComponent(document.getElementById("identifiant").textContent)}`, {
        method: "DELETE",
        credentials: "include"
    });

    const data = await response.json();
    alert(data.message);
    if (response.ok) window.location.href = "/login.html";
});