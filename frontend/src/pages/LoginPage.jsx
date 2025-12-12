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
  alignSelf: "flex-end",
};

export default function LoginPage() {
  const navigate = useNavigate();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState("");

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");

    // ← AQUÍ ESTABA EL ERROR: ahora usamos los estados correctos
    if (!correo || !contrasena) {
      setError("Completa todos los campos");
      return;
    }

    try {
      const res = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ correo, contrasena }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Error al iniciar sesión");
        return;
      }

      // Guardamos el ID real del usuario
      localStorage.setItem("userId", data.user._id);
      navigate("/home");//para que vaya al homme del ususario
    } catch (e) {
      console.error(e);
      setError("No se pudo conectar con el servidor");
    }
  }

  return (
    <div style={wrapper}>
      <div style={card}>
        <h1 style={{ textAlign: "center", marginTop: 0, marginBottom: "1.5rem" }}>
          My Vinyls
        </h1>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div>
            <label style={{ fontSize: "0.9rem" }}>Correo</label>
            <input
              type="email"
              style={inputDark}
              placeholder="correo@ejemplo.com"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
            />
          </div>

          <div>
            <label style={{ fontSize: "0.9rem" }}>Contraseña</label>
            <input
              type="password"
              style={inputDark}
              placeholder="Contraseña"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
            />
          </div>

          {error && <p style={{ color: "#ff8a8a", margin: 0, fontSize: "0.9rem" }}>{error}</p>}

          <button style={buttonPrimary} type="submit">
            Acceder
          </button>
        </form>

        <div style={{ textAlign: "center", marginTop: "1.8rem", fontSize: "0.9rem" }}>
          ¿No tienes una cuenta?
          <div
            style={{
              marginTop: "0.7rem",
              borderRadius: "999px",
              border: "1px solid #f97316",
              padding: "0.6rem 1.4rem",
              display: "inline-block",
              cursor: "pointer",
            }}
            onClick={() => navigate("/register")}
          >
            REGÍSTRATE
          </div>
        </div>
      </div>
    </div>
  );
}