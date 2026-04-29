import express from "express";
import { fileURLToPath } from "url";
import path from "path";
import fichesRoutes from "./routes/fiches.js";
import userRoutes from "./routes/users.js";

const __dirname = path.dirname(fileURLToPath(import.meta.url)); 
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "../html"), { etag: false, maxAge: 0 }));
app.use(express.static(path.join(__dirname, "../css"), { etag: false, maxAge: 0 }));
app.use(express.static(path.join(__dirname, "../javascript"), { etag: false, maxAge: 0 }));

app.use("/fiches", fichesRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => console.log("Serveur lancé sur 3000."));