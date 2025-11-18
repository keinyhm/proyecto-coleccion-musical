import express from "express";
import cors from "cors";
import { config } from "dotenv";
import { connectDB } from "./config/db.js";
import artistaRoutes from "./routes/artistaRoutes.js";

console.log("index.js se está ejecutando...");  

config();

const app = express();
const PORT = process.env.PORT || 3000;
console.log("USANDO:", process.env.MONGODB_URL);

app.use(cors());
app.use(express.json());

app.use("/api/artistas", artistaRoutes);

app.get("/", (req, res) => {
  res.send("API funcionando correctamente!");
});

connectDB().then(() => {
  console.log("Conexión a la base de datos lista");  // <-- AÑADIDO
  app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
  });
});
