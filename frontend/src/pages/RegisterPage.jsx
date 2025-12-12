// src/pages/RegisterPage.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const wrapper = {
  minHeight: "100vh",
  backgroundColor: "#1a1a1a",
  display: "flex",
  justifyContent: "center",
  alignItems: "flex-start",
  padding: "2rem 1rem",
  color: "white",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: "540px",
  backgroundColor: "#242424",
  borderRadius: "20px",
  padding: "2rem",
  boxShadow: "0 0 20px rgba(0,0,0,0.4)",
};

const inputDark = {
  padding: "0.6rem 1rem",
  borderRadius: "12px",
  border: "1px solid #3a3a3a",
  backgroundColor: "#1e1e1e",
  color: "white",
  width: "100%",
  marginTop: "0.25rem",
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
  marginTop: "1rem",
};

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({ nombre: "", correo: "", contrasena: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (!form.nombre || !form.correo || !form.contrasena) {
      setError("Todos los campos son obligatorios");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al registrarse");
        setLoading(false);
        return;
      }

      localStorage.setItem("userId", data.user._id);
      navigate("/perfil");
    } catch (err) {
      setError("No se pudo conectar con el servidor");
      setLoading(false);
    }
  }

  return (
    <div style={wrapper}>
      <div style={card}>
        <h1 style={{ textAlign: "center" }}>My Vinyls</h1>
        <p style={{ textAlign: "center", color: "#ccc" }}>Crea tu cuenta</p>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label>Nombre</label>
            <input style={inputDark} name="nombre" value={form.nombre} onChange={handleChange} placeholder="Tu nombre" />
          </div>
          <div>
            <label>Correo</label>
            <input style={inputDark} name="correo" type="email" value={form.correo} onChange={handleChange} placeholder="correo@ejemplo.com" />
          </div>
          <div>
            <label>Contraseña</label>
            <input style={inputDark} name="contrasena" type="password" value={form.contrasena} onChange={handleChange} placeholder="Contraseña" />
          </div>

          {error && <p style={{ color: "#ff8a8a" }}>{error}</p>}

          <button style={buttonPrimary} type="submit" disabled={loading}>
            {loading ? "Registrando..." : "Registrarse"}
          </button>
        </form>

        <p style={{ textAlign: "center", marginTop: "1rem" }}>
          ¿Ya tienes cuenta? <span style={{ color: "#f97316", cursor: "pointer" }} onClick={() => navigate("/login")}>Acceder</span>
        </p>
      </div>
    </div>
  );
}