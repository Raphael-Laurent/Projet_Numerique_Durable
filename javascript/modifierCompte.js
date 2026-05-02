async function modifierCompte() {
    const response = await fetch("/api/auth/me", {
        method: "GET",
        credentials: "include"
    });

    if (!response.ok) {
        window.location.href = "/login.html";
        return;
    }

    const data = await response.json();
    const identifiant = data.utilisateur.identifiant;

    document.getElementById("modifier_compte").addEventListener("submit", async (e) => {
        e.preventDefault();

        const mdp = document.getElementById("mdp").value;
        const mdp_confirm = document.getElementById("mdp_confirm").value;

        if (mdp !== mdp_confirm) {
            alert("Les mots de passe ne correspondent pas.");
            return;
        }

        const res = await fetch(`/users/${encodeURIComponent(identifiant)}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify({ mdp })
        });

        const result = await res.json();
        alert(result.message);

        if (res.ok) window.location.href = "/account.html";
    });
}

modifierCompte();