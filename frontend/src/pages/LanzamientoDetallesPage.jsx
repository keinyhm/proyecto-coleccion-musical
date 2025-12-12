// src/pages/LanzamientoDetallesPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const pillStyle = {
  fontSize: "0.8rem",
  backgroundColor: "#333",
  padding: "0.3rem 0.9rem",
  borderRadius: "999px",
  color: "white",
};

export function LanzamientoDetallesPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [lanzamiento, setLanzamiento] = useState(null);
  const [cargando, setCargando] = useState(true);

  // 1. OBTENER DETALLES DEL DISCO
  useEffect(() => {
    if (!id || id === "undefined") {
      setCargando(false);
      return; // Previene el fetch si no hay ID
    }

    fetch(`http://localhost:3000/api/lanzamientos/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error(`Error ${res.status}: Disco no encontrado`);
        return res.json();
      })
      .then((data) => {
        setLanzamiento(data);
        setCargando(false);
      })
      .catch((err) => {
        console.error("Error al obtener el lanzamiento:", err);
        setCargando(false);
      });
  }, [id]);

  // 2. FUNCIÓN PARA AÑADIR A LA COLECCIÓN REAL
  const añadirAColeccion = async () => {
    try {
      const res = await fetch("http://localhost:3000/api/coleccion", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          id_lanzamiento: id 
        })
      });

      if (res.ok) {
        alert(`¡"${lanzamiento.titulo}" se ha añadido a tu biblioteca!`);
      } else {
        const error = await res.json();
        alert(`Error al añadir: ${error.error || "Ya está en tu colección"}`);
      }
    } catch (err) {
      alert("Error de conexión con la API de colección.");
    }
  };

  if (cargando) return <div style={{ color: "white", textAlign: "center", padding: "5rem" }}>Cargando...</div>;
  if (!lanzamiento) return <div style={{ color: "white", textAlign: "center", padding: "5rem" }}>Disco no encontrado</div>;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#1a1a1a",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem 1rem",
        color: "white",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#242424",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.4)",
          padding: "1.8rem 1.6rem 2.4rem",
        }}
      >
        <button
          onClick={() => navigate(-1)}
          style={{
            background: "transparent",
            border: "none",
            color: "white",
            fontSize: "1.3rem",
            cursor: "pointer",
            marginBottom: "0.8rem",
          }}
        >
          ←
        </button>

        <div style={{ textAlign: "center", marginBottom: "1.4rem" }}>
          <img
            src={lanzamiento.portada?.url || "https://via.placeholder.com/260"}
            alt={lanzamiento.titulo}
            style={{
              width: "100%",
              maxWidth: "260px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
              objectFit: "cover",
            }}
          />
        </div>

        <h1 style={{ margin: 0, fontSize: "1.6rem", textAlign: "center" }}>
          {lanzamiento.titulo}
        </h1>
        
        <p style={{ margin: "0.3rem 0 1rem", color: "#f97316", fontWeight: "bold", textAlign: "center" }}>
          {lanzamiento?.id_artista?.nombre || "Artista desconocido"} · {lanzamiento?.anioLanzamiento || "N/A"}
        </p>

        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "0.4rem",
            justifyContent: "center",
            marginBottom: "1rem",
          }}
        >
          <span style={pillStyle}>Formato: {lanzamiento.formato}</span>
          {lanzamiento.sello && <span style={pillStyle}>Sello: {lanzamiento.sello}</span>}
          {lanzamiento.generos?.map((g) => (
            <span key={g} style={pillStyle}>{g}</span>
          ))}
        </div>

        <h2 style={{ fontSize: "1.05rem", margin: "1rem 0 0.5rem" }}>
          Lista de pistas
        </h2>
        
        <ol
          style={{
            paddingLeft: "1.2rem",
            marginTop: 0,
            marginBottom: "1.5rem",
            fontSize: "0.95rem",
            color: "#ccc"
          }}
        >
          {lanzamiento.pistas && lanzamiento.pistas.length > 0 ? (
            lanzamiento.pistas.map((pista, index) => (
              <li key={index} style={{ marginBottom: "0.3rem" }}>
                {pista.titulo}
              </li>
            ))
          ) : (
            <p style={{ color: "#666", fontSize: "0.8rem" }}>No hay pistas registradas</p>
          )}
        </ol>

        <div style={{ textAlign: "center" }}>
          <button
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem 1.8rem",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(234,88,12,0.45)",
              width: "100%"
            }}
            onClick={añadirAColeccion}
          >
            + Añadir a mi colección
          </button>
        </div>
      </div>
    </div>
  );
}