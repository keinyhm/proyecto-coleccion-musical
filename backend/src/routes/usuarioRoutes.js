import express from "express";
import { Usuario } from "../models/usuario.js";
import Coleccion from "../models/coleccion.js"; 

const router = express.Router();

// Contar álbumes del usuario
router.get("/:id/albumes/count", async (req, res) => {
  try {
    const total = await Coleccion.countDocuments({ id_usuario: req.params.id });
    res.json({ total });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Obtener perfil
router.get("/:id", async (req, res) => {
  try {
    const u = await Usuario.findById(req.params.id).select("-contrasena");
    if (!u) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(u);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

// Actualizar avatar
router.put("/:id/avatar", async (req, res) => {
  try {
    const { url } = req.body;

    const u = await Usuario.findByIdAndUpdate(
      req.params.id,
      { avatar: { url } },
      { new: true }
    ).select("-contrasena");

    if (!u) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json(u);
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
});

export default router;
