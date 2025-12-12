import mongoose from "mongoose";   // ← ESTA LÍNEA FALTABA

const usuarioSchema = new mongoose.Schema({
  nombre: { type: String, required: true },
  correo: { type: String, required: true, unique: true },
  contrasena: { type: String, required: true },
  avatar: {
    url: { type: String, default: "" }
  },
  fechaRegistro: { type: Date, default: Date.now },
  rol: { type: [String], default: ["usuario"] }
});

export const Usuario = mongoose.model("Usuario", usuarioSchema);
