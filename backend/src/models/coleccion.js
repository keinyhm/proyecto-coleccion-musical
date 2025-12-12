import mongoose from "mongoose";

const coleccionSchema = new mongoose.Schema({
  id_usuario: { type: mongoose.Schema.Types.ObjectId, ref: "Usuario", required: true },
  titulo: { type: String, required: true },
  artista: { type: String, required: true },
  cover: { type: String },  // opcional
  itunesId: { type: Number },
  fechaAgregado: { type: Date, default: Date.now },
});

const Coleccion = mongoose.model("Coleccion", coleccionSchema);
export default Coleccion;