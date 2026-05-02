async function verifierConnexion() {
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
        window.utilisateurConnecte = data.utilisateur;

        const adminLink = document.getElementById("adminLink");
        if (adminLink && data.utilisateur.admin) {
            adminLink.style.display = "inline";
        }
    } catch (error) {
        window.location.href = "/login.html";
    }
}

verifierConnexion();