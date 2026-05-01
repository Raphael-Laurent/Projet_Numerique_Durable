const signupForm = document.getElementById("signupForm");
const message = document.getElementById("message");

signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    message.textContent = "";

    const num_etudiant = document.getElementById("num_etudiant").value.trim();
    const mdp = document.getElementById("mdp").value;

    try {
        const response = await fetch("/users/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                num_etudiant: num_etudiant,
                mdp: mdp,
                admin: 0
            })
        });

        const data = await response.json();

        if (!response.ok) {
            message.textContent = data.message || "Erreur lors de la création du compte.";
            return;
        }

        window.location.href = "/login.html";

    } catch (error) {
        message.textContent = "Impossible de contacter le serveur.";
    }
});