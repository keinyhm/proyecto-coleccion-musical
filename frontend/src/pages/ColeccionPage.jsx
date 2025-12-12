// src/pages/ColeccionPage.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ColeccionPage() {
  const [misDiscos, setMisDiscos] = useState([]);
  const navigate = useNavigate();
  const userId = localStorage.getItem("userId");

  const cargarColeccion = async () => {
    if (!userId) return;

    try {
      const res = await fetch(`http://localhost:3000/api/coleccion?userId=${userId}`);
      const data = await res.json();
      if (Array.isArray(data)) {
        setMisDiscos(data);
      } else {
        setMisDiscos([]);
      }
    } catch (err) {
      console.error("Error al cargar la colección:", err);
      setMisDiscos([]);
    }
  };

  useEffect(() => {
    cargarColeccion();
  }, [userId]);

  const eliminarAlbum = async (albumId, titulo) => {
    if (!window.confirm(`¿Eliminar "${titulo}" de tu biblioteca?`)) return;

    try {
      const res = await fetch(`http://localhost:3000/api/coleccion/${albumId}`, {
        method: "DELETE",
      });

      if (res.ok) {
        alert("Álbum eliminado correctamente");
        cargarColeccion(); // Recarga la lista
      } else {
        alert("Error al eliminar el álbum");
      }
    } catch (err) {
      alert("Error de conexión");
      console.error(err);
    }
  };

  return (
    <div style={{ padding: "2rem", backgroundColor: "#121212", minHeight: "100vh", color: "white", fontFamily: "system-ui, sans-serif" }}>
      
      {/* HEADER */}
      <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", maxWidth: "900px", margin: "0 auto 2rem auto" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <button onClick={() => navigate("/home")} style={{ background: "none", border: "none", color: "white", cursor: "pointer", fontSize: "1.8rem" }}>←</button>
          <h2 style={{ margin: 0, fontSize: "1.6rem", fontWeight: "bold" }}>Mi Biblioteca</h2>
        </div>
        <button 
          onClick={() => navigate("/explorar")}
          style={{ backgroundColor: "#f97316", border: "none", color: "white", padding: "0.6rem 1.2rem", borderRadius: "999px", cursor: "pointer", fontWeight: "bold" }}
        >
          + Añadir más
        </button>
      </header>

      {/* CONTENEDOR PRINCIPAL */}
      <div style={{ 
        maxWidth: "1000px", 
        margin: "0 auto", 
        backgroundColor: "#1e1e1e", 
        padding: "2rem", 
        borderRadius: "16px",
        border: "1px solid #2a2a2a"
      }}>
        
        {/* GRID */}
        <div style={{ 
          display: "grid", 
          gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))", 
          gap: "2rem" 
        }}>
          {misDiscos.length > 0 ? (
            misDiscos.map((album) => (
              <div 
                key={album._id} 
                style={{ 
                  background: "#282828", 
                  padding: "0.8rem", 
                  borderRadius: "12px", 
                  border: "1px solid #333",
                  position: "relative",
                  transition: "transform 0.3s ease",
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = "translateY(-8px)"}
                onMouseLeave={(e) => e.currentTarget.style.transform = "translateY(0)"}
              >
                {/* CARÁTULA CON BOTÓN ELIMINAR */}
                <div style={{ position: "relative" }}>
                  <img
                    src={album.cover || "https://via.placeholder.com/300"}
                    alt={album.titulo}
                    style={{ width: "100%", borderRadius: "8px", display: "block", boxShadow: "0 8px 16px rgba(0,0,0,0.5)" }}
                  />

                  {/* BOTÓN ELIMINAR */}
                  <button
                    onClick={() => eliminarAlbum(album._id, album.titulo)}
                    style={{
                      position: "absolute",
                      top: "8px",
                      right: "8px",
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#f97316",
                      border: "none",
                      color: "white",
                      fontSize: "1.1rem",
                      fontWeight: "bold",
                      cursor: "pointer",
                      boxShadow: "0 4px 10px rgba(0,0,0,0.5)",
                      transition: "transform 0.2s",
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.transform = "scale(1.1)"}
                    onMouseLeave={(e) => e.currentTarget.style.transform = "scale(1)"}
                  >
                    ✕
                  </button>
                </div>

                {/* INFO */}
                <h4 style={{ margin: "0.8rem 0 0.4rem 0", fontSize: "1rem", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {album.titulo || "Sin título"}
                </h4>
                <p style={{ color: "#b3b3b3", fontSize: "0.85rem", margin: "0" }}>
                  {album.artista || "Artista desconocido"}
                </p>

                {/* Etiqueta Vinilo */}
                <span style={{ 
                  backgroundColor: "#f97316", 
                  padding: "0.2rem 0.6rem", 
                  borderRadius: "8px", 
                  fontSize: "0.7rem", 
                  color: "white",
                  display: "inline-block",
                  marginTop: "0.5rem"
                }}>
                  Vinilo
                </span>
              </div>
            ))
          ) : (
            <div style={{ gridColumn: "1/-1", textAlign: "center", padding: "4rem 0", color: "#666" }}>
              <p style={{ fontSize: "1.2rem" }}>Tu colección está vacía</p>
              <button 
                onClick={() => navigate("/explorar")}
                style={{ marginTop: "1rem", padding: "0.8rem 2rem", background: "#f97316", border: "none", borderRadius: "999px", color: "white", cursor: "pointer" }}
              >
                Explora y añade álbumes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}