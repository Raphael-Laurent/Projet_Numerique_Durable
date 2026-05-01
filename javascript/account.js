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

        document.getElementById("numEtudiant").textContent = data.utilisateur.num_etudiant;
        document.getElementById("roleUtilisateur").textContent = data.utilisateur.admin ? "Administrateur" : "Utilisateur";

    } catch (error) {
        window.location.href = "/login.html";
    }
}

afficherCompte();