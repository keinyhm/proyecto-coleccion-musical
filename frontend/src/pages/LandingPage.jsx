// src/LandingPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// ← IMPORTA LA IMAGEN ASÍ (esto es clave)
import myVinylsLanding from "../assets/myVinylsLanding.png";  // ← Ruta relativa correcta

const wrapper = {
  minHeight: "100vh",
  backgroundColor: "#1a1a1a",          
  display: "flex",
  justifyContent: "center",
  padding: "2rem 1rem",
  color: "white",
  fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
};

const card = {
  width: "100%",
  maxWidth: "900px",
  backgroundColor: "#242424",
  borderRadius: "20px",
  padding: "2rem",
  boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
};

const inputDark = {
  padding: "0.6rem 1rem",
  borderRadius: "999px",
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
};

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div style={wrapper}>
      <div style={card}>
        {/* HEADER */}
        <header style={{ display: "flex", gap: "2rem", marginBottom: "2rem" }}>
          <h1 style={{ margin: 0 }}>My Vinyls</h1>
          <div style={{ flex: 1 }}>
            <input
              style={inputDark}
              placeholder="Buscar discos o artistas..."
            />
          </div>
        </header>

        {/* CONTENIDO */}
        <section
          style={{
            display: "grid",
            gridTemplateColumns: "minmax(0,1.2fr) minmax(0,1fr)",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <div>
            <h2 style={{ marginTop: 0 }}>¡Bienvenid@!</h2>
            <p style={{ color: "#d0d0d0" }}>
              Tu colección de música, organizada al detalle. Gestiona, valora y
              redescubre tus álbumes.
            </p>

            <button
              style={buttonPrimary}
              onClick={() => navigate("/login")}
            >
              Empezar
            </button>

            <p style={{ marginTop: "1rem", fontSize: "0.9rem" }}>
              ¿No tienes una cuenta?{" "}
              <span
                style={{ color: "#f97316", cursor: "pointer" }}
                onClick={() => navigate("/signup")}
              >
                Regístrate
              </span>{" "}
              · ¿Ya tienes una cuenta?{" "}
              <span
                style={{ color: "#f97316", cursor: "pointer" }}
                onClick={() => navigate("/login")}
              >
                Inicia sesión
              </span>
            </p>
          </div>

          {/* BANNER CON IMAGEN LOCAL */}
          <div
            style={{
              height: "260px",
              backgroundImage: `url(${myVinylsLanding})`,  // ← Ahora sí funciona
              backgroundSize: "cover",
              backgroundPosition: "center",
              borderRadius: "16px",
              position: "relative",
              overflow: "hidden",
            }}
          >
            {/* Overlay opcional para oscurecer un poco */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                background: "rgba(0, 0, 0, 0.3)",
              }}
            />
          </div>
        </section>
      </div>
    </div>
  );
}