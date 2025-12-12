import express from "express";
import Coleccion from "../models/coleccion.js";

const router = express.Router();

// OBTENER LA COLECCIÓN DEL USUARIO
router.get("/", async (req, res) => {
  try {
    const userId = req.query.userId;
    const query = userId ? { id_usuario: userId } : {};

    const misDiscos = await Coleccion.find(query).sort({ fechaAgregado: -1 });
    res.json(misDiscos);
  } catch (error) {
    console.error("Error al obtener colección:", error);
    res.status(500).json({ error: error.message });
  }
});

// AÑADIR ÁLBUM (NUEVO ENFOQUE CON iTunes)
router.post("/", async (req, res) => {
  try {
    const { id_usuario, titulo, artista, cover, itunesId } = req.body;

    console.log("PAYLOAD RECIBIDO EN BACKEND:", req.body);  // ← Para ver en consola del servidor

    if (!id_usuario || !titulo || !artista) {
      return res.status(400).json({ error: "Faltan datos obligatorios: id_usuario, titulo, artista" });
    }

    // Evitar duplicados
    const existe = await Coleccion.findOne({ id_usuario, titulo, artista });
    if (existe) {
      return res.status(400).json({ error: "Este álbum ya está en tu colección" });
    }

    const nuevoAlbum = new Coleccion({
      id_usuario,
      titulo,
      artista,
      cover,
      itunesId,
      fechaAgregado: new Date(),
    });

    await nuevoAlbum.save();

    console.log("ÁLBUM GUARDADO CORRECTAMENTE:", nuevoAlbum);

    res.status(201).json({ mensaje: "Álbum añadido correctamente", album: nuevoAlbum });
  } catch (error) {
    console.error("Error al añadir álbum:", error);
    res.status(500).json({ error: error.message });
  }
});

// ELIMINAR ÁLBUM
router.delete("/:id", async (req, res) => {
  try {
    const resultado = await Coleccion.findByIdAndDelete(req.params.id);
    if (!resultado) return res.status(404).json({ error: "Álbum no encontrado" });
    res.json({ message: "Álbum eliminado" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;