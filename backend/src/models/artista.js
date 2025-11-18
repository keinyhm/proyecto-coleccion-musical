import mongoose from "mongoose";

const artistaSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  tipo: { type: String, enum: ["solista", "banda"], required: true },
  miembros: { type: [String], default: [] },
  generos: { type: [String], default: [] },
  pais: { type: String, default: "" },
  imagen: {
    url: { type: String, default: "" }
  }
});

export const Artista = mongoose.model("Artista", artistaSchema);
