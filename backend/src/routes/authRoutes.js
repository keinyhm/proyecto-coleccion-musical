// routes/authRoutes.js
import express from "express";
import { Usuario } from "../models/usuario.js";

const router = express.Router();

// LOGIN 
router.post("/login", async (req, res) => {
  try {
    console.log("BODY:", req.body);

    const { correo, contrasena } = req.body;

    if (!correo || !contrasena) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const usuario = await Usuario.findOne({ correo });

    if (!usuario || usuario.contrasena !== contrasena) {
      return res.status(401).json({ error: "Credenciales inválidas" });
    }

    res.json({
      user: {
        _id: usuario._id,
        nombre: usuario.nombre,
        correo: usuario.correo
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// REGISTER 
router.post("/register", async (req, res) => {
  try {
    console.log("BODY REGISTER:", req.body);

    const { nombre, correo, contrasena } = req.body;

    if (!nombre || !correo || !contrasena) {
      return res.status(400).json({ error: "Faltan datos" });
    }

    const existe = await Usuario.findOne({ correo });
    if (existe) {
      return res.status(400).json({ error: "Correo ya registrado" });
    }

    const nuevo = new Usuario({ nombre, correo, contrasena });
    await nuevo.save();

    res.json({
      user: {
        _id: nuevo._id,
        nombre: nuevo.nombre,
        correo: nuevo.correo
      }
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;