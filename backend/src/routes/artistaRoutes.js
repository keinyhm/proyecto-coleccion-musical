import express from "express";
import { Artista } from "../models/artista.js";

const router = express.Router();

// Crear artista
router.post("/", async (req, res) => {
  try {
    const artista = new Artista(req.body);
    const nuevo = await artista.save();
    res.status(201).json(nuevo);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Obtener todos los artistas
router.get("/", async (req, res) => {
  try {
    const artistas = await Artista.find();
    res.json(artistas);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener artista por ID
router.get("/:id", async (req, res) => {
  try {
    const artista = await Artista.findById(req.params.id);
    if (!artista) return res.status(404).json({ error: "Artista no encontrado" });
    res.json(artista);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Actualizar artista
router.put("/:id", async (req, res) => {
  try {
    const actualizado = await Artista.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!actualizado) return res.status(404).json({ error: "Artista no encontrado" });
    res.json(actualizado);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Eliminar artista
router.delete("/:id", async (req, res) => {
  try {
    const borrado = await Artista.findByIdAndDelete(req.params.id);
    if (!borrado) return res.status(404).json({ error: "Artista no encontrado" });
    res.json({ message: "Artista eliminado correctamente" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export default router;
