import { Router } from "express";
import Lanzamiento from "../models/lanzamiento.js";
import { buscarRelease, detalleRelease, portadaRelease } from "../services/musicbrainz.js";

const router = Router();

router.post("/lanzamiento", async (req, res) => {
  try {
    const { id_artista, artistaNombre, titulo, formato = "Vinilo" } = req.body;

    const release = await buscarRelease(artistaNombre, titulo);
    if (!release) return res.status(404).json({ error: "No se encontró el álbum" });

    const detalle = await detalleRelease(release.id);
    const portadaUrl = await portadaRelease(release.id);

    // pistas
    const pistas = [];
    for (const m of detalle.media || []) {
      for (const t of m.tracks || []) {
        if (t.title) pistas.push({ titulo: t.title });
      }
    }

    const sello = detalle["label-info"]?.[0]?.label?.name || "";
    const anioLanzamiento = detalle.date ? Number(detalle.date.slice(0, 4)) : null;
    const generos = (detalle.tags || []).slice(0, 5).map((x) => x.name);

    const doc = await Lanzamiento.create({
      id_artista,
      titulo: detalle.title || titulo,
      anioLanzamiento,
      formato,
      edicion: "Standard",
      sello,
      generos,
      portada: { url: portadaUrl || "" },
      pistas,
    });

    return res.status(201).json(doc);
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: "Error importando lanzamiento" });
  }
});

export default router;
