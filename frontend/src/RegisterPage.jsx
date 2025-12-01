// src/pages/RegisterPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const wrapper = { /* ... */ };
const card = { /* ... */ };
const inputDark = { /* ... */ };
const buttonPrimary = { /* ... */ };

export default function RegisterPage() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // aquí harías tu lógica real de signup
    navigate("/app"); // tras registrarse, ir a la home logueada
  }

  return (
    <div style={wrapper}>
      <div style={card}>
        {/* ... título ... */}

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* ... inputs ... */}
          <button style={buttonPrimary} type="submit">
            Registrarse
          </button>
        </form>

        <p style={{ marginTop: "1.2rem", textAlign: "center", fontSize: "0.9rem" }}>
          ¿Ya tienes una cuenta?{" "}
          <span
            style={{ color: "#f97316", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Acceder
          </span>
        </p>
      </div>
    </div>
  );
}
