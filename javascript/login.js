const loginForm = document.getElementById("loginForm");
const errorMessage = document.getElementById("errorMessage");

loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    errorMessage.textContent = "";

    const num_etudiant = document.getElementById("num_etudiant").value.trim();
    const mdp = document.getElementById("mdp").value;

    try {
        const response = await fetch("/api/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                num_etudiant: num_etudiant,
                mdp: mdp
            })
        });

        const data = await response.json();

        if (!response.ok) {
            errorMessage.textContent = data.message || "Erreur de connexion.";
            return;
        }

        window.location.href = "/html/account.html";

    } catch (error) {
        errorMessage.textContent = "Impossible de contacter le serveur.";
    }
});