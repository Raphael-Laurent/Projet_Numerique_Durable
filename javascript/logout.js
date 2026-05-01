const logoutBtn = document.getElementById("logoutBtn");

if (logoutBtn) {
    logoutBtn.addEventListener("click", async () => {
        try {
            await fetch("/api/auth/logout", {
                method: "POST",
                credentials: "include"
            });

            window.location.href = "/login.html";

        } catch (error) {
            alert("Erreur lors de la déconnexion.");
        }
    });
}