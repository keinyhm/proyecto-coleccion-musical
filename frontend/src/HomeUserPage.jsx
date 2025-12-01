// src/HomeUserPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

// ===== ESTILOS =====
const wrapper = {
  minHeight: "100vh",
  backgroundColor: "#1a1a1a",
  padding: "2rem 1rem",
  display: "flex",
  justifyContent: "center",
  color: "white",
};

const card = {
  width: "100%",
  maxWidth: "960px",
  backgroundColor: "#242424",
  borderRadius: "20px",
  padding: "2rem",
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

export default function HomeUserPage() {
  const navigate = useNavigate();

  // Leer usuario guardado
  const stored = localStorage.getItem("user");
  const user = stored ? JSON.parse(stored) : null;

  // Control de rol real
  const isAdmin = user && Array.isArray(user.rol) && user.rol.includes("admin");

  return (
    <div style={wrapper}>
      <div style={card}>
        {/* HEADER */}
        <header
          style={{
            display: "flex",
            alignItems: "center",
            gap: "1rem",
            marginBottom: "2rem",
          }}
        >
          <h2 style={{ margin: 0, whiteSpace: "nowrap" }}>My Vinyls</h2>

          <div style={{ flex: 1 }}>
            <input
              style={inputDark}
              placeholder="Buscar discos o artistas..."
            />
          </div>

          <nav
            style={{
              display: "flex",
              gap: "1rem",
              fontSize: "0.9rem",
              textTransform: "uppercase",
            }}
          >
            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/coleccion")}
            >
              Librería
            </span>

            <span
              style={{ cursor: "pointer" }}
              onClick={() => navigate("/perfil")}
            >
              Perfil
            </span>

            {/* SOLO PARA ADMINS */}
            {isAdmin && (
              <span
                style={{
                  cursor: "pointer",
                  color: "#f97316",
                  fontWeight: "bold",
                }}
                onClick={() => navigate("/admin/discos")}
              >
                Admin
              </span>
            )}
          </nav>
        </header>

        {/* TEXTO PRINCIPAL */}
        <h2>¡Bienvenid@ de vuelta, usuario!</h2>
        <p style={{ color: "#d0d0d0" }}>
          Tu colección de música, organizada al detalle. Gestiona, valora y
          redescubre tus álbumes.
        </p>

        {/* BANNER NARANJA */}
        <div
          style={{
            height: "260px",
            background:
              "linear-gradient(135deg, #4b3d32, #1e1e1e 40%, #f97316 110%)",
            borderRadius: "18px",
            position: "relative",
          }}
        >
          <button
            style={{
              ...buttonPrimary,
              position: "absolute",
              right: "1rem",
              bottom: "1rem",
            }}
            onClick={() => navigate("/explorar")}
          >
            Empezar
          </button>
        </div>
      </div>
    </div>
  );
}
