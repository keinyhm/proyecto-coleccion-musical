// src/pages/AdminDiscosPage.jsx
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/lanzamientos";
const ARTISTAS_URL = "http://localhost:3000/api/artistas";

// ... (tus estilos se mantienen igual)

export default function AdminDiscosPage() {
  const [role, setRole] = useState(null);
  const [checking, setChecking] = useState(true);
  const [discos, setDiscos] = useState([]);
  const [artistas, setArtistas] = useState([]);

  const [titulo, setTitulo] = useState("");
  const [idArtista, setIdArtista] = useState(""); 
  const [anio, setAnio] = useState("");
  const [formato, setFormato] = useState("Vinilo");
  const [genero, setGenero] = useState("");
  const [portadaUrl, setPortadaUrl] = useState("");

  useEffect(() => {
    const stored = localStorage.getItem("user");
    if (!stored) {
      setRole("anon");
      setChecking(false);
      return;
    }
    try {
      const user = JSON.parse(stored);
      if (Array.isArray(user.rol) && user.rol.includes("admin")) {
        setRole("admin");
      } else {
        setRole("user");
      }
    } catch (err) {
      setRole("anon");
    } finally {
      setChecking(false);
    }
  }, []);

  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setDiscos(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error cargando discos:", err));

    fetch(ARTISTAS_URL)
      .then((res) => res.json())
      .then((data) => setArtistas(Array.isArray(data) ? data : []))
      .catch((err) => console.error("Error cargando artistas:", err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    if (!idArtista) {
      alert("Por favor, selecciona un artista");
      return;
    }

    // CORRECCIÓN: Estructura exacta que pide tu modelo lanzamiento.js
    const nuevoLanzamiento = {
      titulo,
      id_artista: idArtista, 
      anioLanzamiento: anio ? Number(anio) : undefined,
      formato,
      generos: genero.split(",").map(g => g.trim()), 
      portada: { 
        url: portadaUrl // Aquí se guarda la URL correctamente dentro del objeto portada
      }
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevoLanzamiento),
      });

      if (!res.ok) throw new Error("Error al crear disco");

      const creado = await res.json();
      setDiscos([...discos, creado]);

      // Limpiar formulario
      setTitulo("");
      setIdArtista("");
      setAnio("");
      setGenero("");
      setPortadaUrl("");
      alert("¡Disco creado con éxito!");
    } catch (err) {
      alert("No se pudo crear el disco: " + err.message);
    }
  }

  // ... (función eliminar y renderizado de acceso denegado igual)

  return (
    <div style={wrapper}>
      <div style={card}>
        <h1>Administración de lanzamientos</h1>
        
        <form onSubmit={handleSubmit} style={{ display: "grid", gap: "1rem", marginBottom: "2rem" }}>
          <input
            style={inputDark}
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            placeholder="Título del álbum"
            required
          />

          <select 
            style={inputDark} 
            value={idArtista} 
            onChange={(e) => setIdArtista(e.target.value)}
            required
          >
            <option value="">-- Selecciona un Artista --</option>
            {artistas.map(a => (
              <option key={a._id} value={a._id}>{a.nombre}</option>
            ))}
          </select>

          <div style={{ display: "flex", gap: "1rem" }}>
            <input
              style={inputDark}
              type="number"
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              placeholder="Año"
            />
            <select style={inputDark} value={formato} onChange={(e) => setFormato(e.target.value)}>
              <option value="Vinilo">Vinilo</option>
              <option value="CD">CD</option>
              <option value="Digital">Digital</option>
            </select>
          </div>

          <input
            style={inputDark}
            value={genero}
            onChange={(e) => setGenero(e.target.value)}
            placeholder="Géneros (separados por coma: Rock, Pop)"
          />

          <input
            style={inputDark}
            value={portadaUrl}
            onChange={(e) => setPortadaUrl(e.target.value)}
            placeholder="URL de la imagen de portada"
          />

          <button type="submit" style={buttonPrimary}>Guardar en Catálogo</button>
        </form>

        <h2>Catálogo Actual</h2>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {discos.map((d) => (
            <li key={d._id} style={{ display: "flex", justifyContent: "space-between", padding: "0.5rem 0", borderBottom: "1px solid #333" }}>
              <span>
                <strong>{d.titulo}</strong> — {d.id_artista?.nombre || "Cargando..."} ({d.anioLanzamiento})
              </span>
              <button 
                onClick={() => eliminarDisco(d._id)}
                style={{ ...buttonPrimary, background: "red", padding: "0.3rem 0.8rem" }}
              >
                Eliminar
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}