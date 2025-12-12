import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api";

export default function SingInPage() {
  const navigate = useNavigate();

  const [nombre, setNombre] = useState("");
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    if (!nombre.trim() || !correo.trim() || !contrasena.trim()) {
      setError("Completa usuario, correo y contraseña");
      return;
    }
    if (!correo.includes("@")) {
      setError("Correo inválido");
      return;
    }
    if (contrasena.length < 4) {
      setError("Contraseña muy corta (mínimo 4)");
      return;
    }

    try {
      const res = await fetch(`${API}/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nombre, correo, contrasena }), // SIN Ñ
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data?.error || "No se pudo registrar");
        return;
      }

      // Guardamos el userId para PerfilPage
      localStorage.setItem("userId", data.user._id);

      navigate("/app");
    } catch (e2) {
      setError("No se pudo conectar con el servidor");
    }
  }

  return (
    <div style={{ minHeight: "100vh", background: "#1a1a1a", display: "flex", justifyContent: "center", padding: "2rem", color: "white" }}>
      <div style={{ width: "100%", maxWidth: 540, background: "#242424", borderRadius: 20, padding: "2rem" }}>
        <h1 style={{ textAlign: "center" }}>My Vinyls</h1>
        <p style={{ textAlign: "center", color: "#d0d0d0" }}>Regístrate para gestionar tus discos</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label>Usuario</label>
            <input value={nombre} onChange={(e) => setNombre(e.target.value)} style={inputDark} placeholder="Ingresa tu usuario" />
          </div>

          <div>
            <label>Correo</label>
            <input value={correo} onChange={(e) => setCorreo(e.target.value)} style={inputDark} placeholder="Ingresa tu correo" />
          </div>

          <div>
            <label>Contraseña</label>
            <input value={contrasena} onChange={(e) => setContrasena(e.target.value)} style={inputDark} type="password" placeholder="Crea una contraseña" />
          </div>

          {error && <div style={{ color: "#ff5c5c" }}>{error}</div>}

          <button style={buttonPrimary} type="submit">Registrarse</button>
        </form>

        <p style={{ marginTop: "1.2rem", textAlign: "center", fontSize: "0.9rem" }}>
          ¿Ya tienes una cuenta?{" "}
          <span style={{ color: "#f97316", cursor: "pointer" }} onClick={() => navigate("/login")}>
            Acceder
          </span>
        </p>
      </div>
    </div>
  );
}

const inputDark = {
  padding: "0.6rem 1rem",
  borderRadius: "12px",
  border: "1px solid #3a3a3a",
  backgroundColor: "#1e1e1e",
  color: "white",
  width: "100%",
};

const buttonPrimary = {
  padding: "0.75rem 1.8rem",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #f97316, #ea580c)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
  width: "100%",
};
