import express from "express";
import fichesRoutes from "./routes/fiches.js";
import userRoutes from "./routes/users.js";

const app = express();
app.use(express.json());

app.use("/fiches", fichesRoutes);
app.use("/users", userRoutes);

app.listen(3000, () => {
    console.log("Serveur lancé sur 3000.");
});