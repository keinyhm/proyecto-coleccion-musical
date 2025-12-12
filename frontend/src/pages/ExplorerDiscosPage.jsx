import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function ExplorerDiscosPage() {
  const navigate = useNavigate();
  const [busqueda, setBusqueda] = useState("");
  const [albumes, setAlbumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [buscado, setBuscado] = useState(false);

  const buscarAlbumes = async () => {
    if (!busqueda.trim()) return;

    setLoading(true);
    setBuscado(true);
    try {
      const res = await fetch(
        `https://itunes.apple.com/search?term=${encodeURIComponent(busqueda)}&entity=album&limit=50`
      );
      const data = await res.json();
      setAlbumes(data.results || []);
    } catch (err) {
      alert("Error al conectar con la API de música");
      console.error(err);
    }
    setLoading(false);
  };


const agregarALaColeccion = async (album) => {
  const userId = localStorage.getItem("userId");
  if (!userId) {
    alert("Debes iniciar sesión");
    navigate("/login");
    return;
  }

  const payload = {
    id_usuario: userId,
    titulo: album.collectionName || "Sin título",
    artista: album.artistName || "Artista desconocido",
    cover: album.artworkUrl100 ? album.artworkUrl100.replace("100x100bb", "600x600bb") : null,
    itunesId: album.collectionId || null,
  };

  console.log("PAYLOAD ENVIADO:", payload);  

  try {
    const res = await fetch("http://localhost:3000/api/coleccion", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    const data = await res.json();

    if (res.ok) {
      alert(`¡${payload.titulo} añadido correctamente!`);
    } else {
      alert(data.error || "Error del servidor");
      console.error("Error backend:", data);
    }
  } catch (err) {
    alert("Error de conexión");
    console.error("Error fetch:", err);
  }
};

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#1a1a1a", color: "white", padding: "2rem 1rem", fontFamily: "system-ui, sans-serif" }}>
      {/* Volver */}
      <button
        onClick={() => navigate("/home")}
        style={{ background: "none", border: "none", color: "white", fontSize: "2rem", cursor: "pointer", marginBottom: "1rem" }}
      >
        ←
      </button>

      <h1 style={{ textAlign: "center", marginBottom: "2rem" }}>Explora y añade álbumes</h1>

      {/* Barra de búsqueda */}
      <div style={{ maxWidth: "700px", margin: "0 auto 3rem auto", display: "flex", gap: "1rem" }}>
        <input
          type="text"
          placeholder="Busca álbum o artista... (ej: The Beatles, Radiohead, Metallica)"
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && buscarAlbumes()}
          style={{
            flex: 1,
            padding: "1rem 1.5rem",
            borderRadius: "999px",
            backgroundColor: "#242424",
            border: "1px solid #444",
            color: "white",
            fontSize: "1.1rem",
          }}
        />
        <button
          onClick={buscarAlbumes}
          style={{
            padding: "0 2rem",
            borderRadius: "999px",
            background: "linear-gradient(135deg, #f97316, #ea580c)",
            border: "none",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
          }}
        >
          Buscar
        </button>
      </div>

      {/* Estados */}
      {loading && <p style={{ textAlign: "center" }}>Buscando álbumes...</p>}
      {!loading && buscado && albumes.length === 0 && (
        <p style={{ textAlign: "center", color: "#888", fontSize: "1.2rem" }}>
          No se encontraron resultados. ¡Prueba con otro término!
        </p>
      )}

      {/* Grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "2rem",
          maxWidth: "1400px",
          margin: "0 auto",
        }}
      >
        {albumes.map((album) => (
          <div
            key={album.collectionId}
            style={{
              backgroundColor: "#242424",
              borderRadius: "16px",
              overflow: "hidden",
              boxShadow: "0 8px 20px rgba(0,0,0,0.4)",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "translateY(-10px)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "translateY(0)")}
          >
            {/* Carátula */}
            <div style={{ position: "relative" }}>
              <img
                src={album.artworkUrl100.replace("100x100bb", "600x600bb")}
                alt={album.collectionName}
                style={{ width: "100%", display: "block" }}
              />

              {/* Botón + flotante */}
              <button
                onClick={() => agregarALaColeccion(album)}
                style={{
                  position: "absolute",
                  bottom: "12px",
                  right: "12px",
                  width: "50px",
                  height: "50px",
                  borderRadius: "50%",
                  background: "#f97316",
                  border: "none",
                  fontSize: "1.8rem",
                  fontWeight: "bold",
                  color: "white",
                  cursor: "pointer",
                  boxShadow: "0 4px 15px rgba(0,0,0,0.6)",
                  opacity: 0.9,
                  transition: "all 0.2s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
                onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
              >
                +
              </button>
            </div>

            {/* Info */}
            <div style={{ padding: "1rem" }}>
              <h4 style={{ margin: "0 0 0.4rem 0", fontSize: "1rem" }}>{album.collectionName}</h4>
              <p style={{ margin: 0, color: "#bbb", fontSize: "0.9rem" }}>{album.artistName}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}