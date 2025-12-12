import express from "express";
import Lanzamiento from "../models/lanzamiento.js";

const router = express.Router();

// Obtener todos los lanzamientos
router.get("/", async (req, res) => {
  try {
    const lanzamientos = await Lanzamiento.find().populate("id_artista");
    res.json(lanzamientos);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener un lanzamiento por ID
router.get("/:id", async (req, res) => {
  try {
    const disco = await Lanzamiento.findById(req.params.id).populate("id_artista");
    if (!disco) return res.status(404).json({ error: "No encontrado" });
    res.json(disco);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Crear un lanzamiento (Usado por AdminDiscosPage)
router.post("/", async (req, res) => {
  try {
    const nuevo = new Lanzamiento(req.body);
    const guardado = await nuevo.save();
    res.status(201).json(guardado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;