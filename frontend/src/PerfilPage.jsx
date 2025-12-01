// src/PerfilPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const wrapper = {
  minHeight: "100vh",
  backgroundColor: "#1a1a1a",
  padding: "2rem 1rem",
  color: "white",
  display: "flex",
  justifyContent: "center",
};

const card = {
  width: "100%",
  maxWidth: "720px",
  backgroundColor: "#242424",
  padding: "2rem",
  borderRadius: "20px",
};

const buttonPrimary = {
  padding: "0.6rem 1.4rem",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #f97316, #ea580c)",
  color: "white",
  cursor: "pointer",
};

export default function PerfilPage() {
  const navigate = useNavigate();

  return (
    <div style={wrapper}>
      <div style={card}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            marginBottom: "1.8rem",
          }}
        >
          <span
            style={{ fontSize: "1.4rem", cursor: "pointer" }}
            onClick={() => navigate("/app")}
          >
            ←
          </span>
          <h2 style={{ margin: 0 }}>Perfil</h2>
        </header>

        <div style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
          <div
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "999px",
              background: "black",
            }}
          />

          <button style={buttonPrimary}>Actualizar foto de perfil</button>
        </div>

        <div>
          {[
            ["Nombre", "Nombre de usuario"],
            ["Correo", "correo@ejemplo.com"],
            ["Número de álbumes", "42"],
            ["Miembro desde", "2025"],
          ].map(([label, value]) => (
            <div
              key={label}
              style={{
                padding: "1rem 0",
                display: "flex",
                justifyContent: "space-between",
                borderBottom: "1px solid #3a3a3a",
              }}
            >
              <strong>{label}</strong>
              <span style={{ color: "#d0d0d0" }}>{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
