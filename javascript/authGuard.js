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

    } catch (error) {
        window.location.href = "/login.html";
    }
}

verifierConnexion();