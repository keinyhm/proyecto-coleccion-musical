import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import artistaRoutes from "./routes/artistaRoutes.js";
import lanzamientoRoutes from "./routes/lanzamientoRoutes.js";
//import importRoutes from "./routes/importRoutes.js";
import coleccionRoutes from "./routes/coleccionRoutes.js";
import usuarioRoutes from "./routes/usuarioRoutes.js";
import authRoutes from "./routes/authRoutes.js";


console.log("index.js se está ejecutando...");  

config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log("USANDO:", process.env.MONGODB_URL);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/artistas", artistaRoutes);
app.use("/api/lanzamientos", lanzamientoRoutes);
app.use("/api/coleccion", coleccionRoutes);
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/auth", authRoutes);
// app.use("/api/import", importRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente!");
});

connectDB().then(() => {
  console.log("Conexión a la base de datos lista");  // <-- AÑADIDO
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
