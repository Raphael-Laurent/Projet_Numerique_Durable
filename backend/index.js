import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import session from "express-session";

import fichesRoutes from "./routes/fiches.js";
import userRoutes from "./routes/users.js";
import authRoutes from "./routes/auth.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(session({
    name: "session_id",
    secret: "secret-dev-a-changer",
    resave: false,
    saveUninitialized: false,
    cookie: {
        httpOnly: true,
        sameSite: "lax",
        secure: false,
        maxAge: 1000 * 60 * 60 * 2
    }
}));

app.use(express.static(path.join(__dirname, "../frontend/html"), { etag: false, maxAge: 0 }));
app.use(express.static(path.join(__dirname, "../frontend/css"), { etag: false, maxAge: 0 }));
app.use(express.static(path.join(__dirname, "../frontend/javascript"), { etag: false, maxAge: 0 }));

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/html/accueil.html"));
});

app.use("/api/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/fiches", fichesRoutes);

app.use((req, res) => {
    res.status(404).json({
        message: "Route introuvable."
    });
});

app.listen(PORT, () => {
    console.log(`Serveur lancé sur http://localhost:${PORT}`);
});
