// src/ColeccionPage.jsx
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
  maxWidth: "960px",
  backgroundColor: "#242424",
  padding: "2rem",
  borderRadius: "20px",
};

const inputDark = {
  padding: "0.6rem 1rem",
  borderRadius: "999px",
  border: "1px solid #3a3a3a",
  backgroundColor: "#1e1e1e",
  color: "white",
  width: "100%",
};

const pill = {
  backgroundColor: "#333",
  padding: "0.3rem 1rem",
  borderRadius: "999px",
  fontSize: "0.8rem",
};

const buttonPrimary = {
  padding: "0.5rem 1.2rem",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #f97316, #ea580c)",
  color: "white",
  cursor: "pointer",
};

const discos = [
  { titulo: "Abbey Road", artista: "The Beatles", formato: "Vinilo" },
  { titulo: "NeverMind", artista: "Nirvana", formato: "CD" },
  { titulo: "Led Zeppelin IV", artista: "Led Zeppelin", formato: "Vinilo" },
];

export default function ColeccionPage() {
  const navigate = useNavigate();

  return (
    <div style={wrapper}>
      <div style={card}>
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.8rem",
            marginBottom: "1.2rem",
          }}
        >
          <span
            style={{ fontSize: "1.4rem", cursor: "pointer" }}
            onClick={() => navigate("/app")}
          >
            ←
          </span>
          <h2 style={{ margin: 0, flex: 1 }}>Mi colección musical</h2>

          <button
            style={buttonPrimary}
            onClick={() => navigate("/explorar")}
          >
            + Agregar disco
          </button>
        </header>

        <input style={inputDark} placeholder="Buscar..." />

        <div
          style={{
            marginTop: "2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
            gap: "1.4rem",
          }}
        >
          {discos.map((d) => (
            <div
              key={d.titulo}
              style={{
                backgroundColor: "#1f1f1f",
                borderRadius: "16px",
                border: "1px solid #3a3a3a",
                padding: "1rem",
              }}
              onClick={() => navigate("/lanzamiento")}
            >
              <div
                style={{
                  height: "150px",
                  background:
                    "linear-gradient(135deg, #4b5563, #111827, #f97316)",
                  borderRadius: "12px",
                  marginBottom: "0.7rem",
                }}
              />

              <h4>{d.titulo}</h4>
              <p style={{ color: "#d0d0d0" }}>{d.artista}</p>
              <span style={pill}>{d.formato}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
