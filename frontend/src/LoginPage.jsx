// src/LoginPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const wrapper = {
  minHeight: "100vh",
  backgroundColor: "#1a1a1a", // fondo oscuro
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
  backgroundColor: "#242424", // tarjeta gris oscura
  borderRadius: "20px",
  padding: "2rem",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
};

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
  background: "linear-gradient(135deg, #f97316, #ea580c)", // naranja
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
  alignSelf: "flex-end",
};

export default function LoginPage() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // aquí iría tu lógica real de login
    navigate("/app");
  }

  return (
    <div style={wrapper}>
      <div style={card}>
        {/* TÍTULO */}
        <h1 style={{ textAlign: "center", marginTop: 0, marginBottom: "1.5rem" }}>
          My Vinyls
        </h1>

        {/* FORMULARIO */}
        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label style={{ fontSize: "0.9rem" }}>Correo o usuario</label>
            <input
              style={{ ...inputDark, marginTop: "0.25rem" }}
              placeholder="Correo o username"
            />
          </div>

          <div>
            <label style={{ fontSize: "0.9rem" }}>Contraseña</label>
            <input
              type="password"
              style={{ ...inputDark, marginTop: "0.25rem" }}
              placeholder="Contraseña"
            />
          </div>

          <button style={buttonPrimary} type="submit">
            Acceder
          </button>
        </form>

        {/* PIE: ENLACE A REGISTRO */}
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
            onClick={() => navigate("/signup")}
          >
            REGÍSTRATE
          </div>
        </div>
      </div>
    </div>
  );
}
