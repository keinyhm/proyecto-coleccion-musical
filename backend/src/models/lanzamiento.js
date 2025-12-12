import mongoose from "mongoose";

const pistaSchema = new mongoose.Schema(
  {
    titulo: { type: String, required: true },
  },
  { _id: false }
);

const lanzamientoSchema = new mongoose.Schema(
  {
    id_artista: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Artista",
      required: true,
    },
    titulo: { type: String, required: true },
    anioLanzamiento: { type: Number },
    formato: { type: String },
    edicion: { type: String },
    sello: { type: String },
    generos: [{ type: String }],
    portada: { url: { type: String } },
    pistas: [pistaSchema],
  },
  { timestamps: true }
);

export default mongoose.model("Lanzamiento", lanzamientoSchema);
