// src/AdminDiscosPage.jsx
import React, { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/discos"; // ajusta si tu backend usa otra ruta

// ====== ESTILOS ======
const wrapper = {
  minHeight: "100vh",
  backgroundColor: "#1a1a1a",
  padding: "2rem 1rem",
  display: "flex",
  justifyContent: "center",
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
  borderRadius: "12px",
  border: "1px solid #3a3a3a",
  backgroundColor: "#1e1e1e",
  color: "white",
  width: "100%",
};

const buttonPrimary = {
  padding: "0.7rem 1.6rem",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #f97316, #ea580c)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
};

export default function AdminDiscosPage() {
  // ==================== 1. CONTROL DE ACCESO ====================
  const [role, setRole] = useState(null); // "admin" | "user" | "anon"
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("user"); // aquí guardas el usuario al hacer login

    if (!stored) {
      setRole("anon");
      setChecking(false);
      return;
    }

    try {
      const user = JSON.parse(stored);

      // 👇 tu campo real es "rol": Array → ["admin"] o ["user"]
      if (Array.isArray(user.rol) && user.rol.includes("admin")) {
        setRole("admin");
      } else {
        setRole("user");
      }
    } catch (err) {
      console.error("Error leyendo usuario:", err);
      setRole("anon");
    } finally {
      setChecking(false);
    }
  }, []);

  // Mientras verificamos el rol
  if (checking) {
    return (
      <div style={{ ...wrapper, alignItems: "center" }}>
        <h2>Cargando...</h2>
      </div>
    );
  }

  // Si NO es admin → bloquear
  if (role !== "admin") {
    return (
      <div style={{ ...wrapper, alignItems: "center" }}>
        <div style={{ ...card, maxWidth: "500px", textAlign: "center" }}>
          <h2>❌ Acceso denegado</h2>
          <p style={{ color: "#ccc" }}>
            Esta sección es solo para administradores.
          </p>
        </div>
      </div>
    );
  }

  // ==================== 2. LÓGICA DE ADMIN (CATÁLOGO) ====================
  const [discos, setDiscos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [artista, setArtista] = useState("");
  const [anio, setAnio] = useState("");
  const [formato, setFormato] = useState("Vinilo");
  const [genero, setGenero] = useState("");
  const [portadaUrl, setPortadaUrl] = useState("");

  // Cargar catálogo existente
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setDiscos(data))
      .catch((err) => console.error("Error cargando discos:", err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const nuevo = {
      titulo,
      artista,
      anioLanzamiento: anio ? Number(anio) : undefined,
      formato,
      genero,
      portadaUrl,
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      if (!res.ok) {
        throw new Error("Error al crear disco");
      }

      const creado = await res.json();
      setDiscos([...discos, creado]);

      // limpiar formulario
      setTitulo("");
      setArtista("");
      setAnio("");
      setFormato("Vinilo");
      setGenero("");
      setPortadaUrl("");
    } catch (err) {
      console.error(err);
      alert("No se pudo crear el disco");
    }
  }

  async function eliminarDisco(id) {
    if (!window.confirm("¿Seguro que quieres eliminar este disco del catálogo?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Error al eliminar");

      setDiscos(discos.filter((d) => d._id !== id));
    } catch (err) {
      console.error("Error eliminando disco:", err);
      alert("No se pudo eliminar el disco");
    }
  }

  // ==================== 3. UI DEL PANEL ADMIN ====================

  return (
    <div style={wrapper}>
      <div style={card}>
        <h1 style={{ marginTop: 0, marginBottom: "1.5rem" }}>
          Administración de discos
        </h1>
        <p style={{ marginTop: 0, marginBottom: "2rem", color: "#d0d0d0" }}>
          Aquí el admin puede crear, editar o borrar discos del catálogo
          general. Los usuarios solo podrán añadir estos discos a su colección
          personal.
        </p>

        {/* FORMULARIO CREAR DISCO */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
            gap: "0.8rem 1rem",
            marginBottom: "2rem",
          }}
        >
          <div style={{ gridColumn: "1 / -1" }}>
            <label>Título</label>
            <input
              style={{ ...inputDark, marginTop: "0.2rem" }}
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Abbey Road"
              required
            />
          </div>

          <div>
            <label>Artista</label>
            <input
              style={{ ...inputDark, marginTop: "0.2rem" }}
              value={artista}
              onChange={(e) => setArtista(e.target.value)}
              placeholder="The Beatles"
              required
            />
          </div>

          <div>
            <label>Año</label>
            <input
              style={{ ...inputDark, marginTop: "0.2rem" }}
              value={anio}
              onChange={(e) => setAnio(e.target.value)}
              placeholder="1969"
              type="number"
            />
          </div>

          <div>
            <label>Formato</label>
            <select
              style={{ ...inputDark, marginTop: "0.2rem" }}
              value={formato}
              onChange={(e) => setFormato(e.target.value)}
            >
              <option value="Vinilo">Vinilo</option>
              <option value="CD">CD</option>
              <option value="Digital">Digital</option>
            </select>
          </div>

          <div>
            <label>Género</label>
            <input
              style={{ ...inputDark, marginTop: "0.2rem" }}
              value={genero}
              onChange={(e) => setGenero(e.target.value)}
              placeholder="Rock, Pop..."
            />
          </div>

          <div style={{ gridColumn: "1 / -1" }}>
            <label>URL de portada</label>
            <input
              style={{ ...inputDark, marginTop: "0.2rem" }}
              value={portadaUrl}
              onChange={(e) => setPortadaUrl(e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div style={{ gridColumn: "1 / -1", textAlign: "right" }}>
            <button type="submit" style={buttonPrimary}>
              Guardar disco en catálogo
            </button>
          </div>
        </form>

        {/* LISTA DE DISCOS DEL CATÁLOGO */}
        <h2 style={{ marginBottom: "0.8rem" }}>Catálogo actual</h2>
        <ul style={{ listStyle: "none", padding: 0, fontSize: "0.95rem" }}>
          {discos.map((d) => (
            <li
              key={d._id}
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                padding: "0.6rem 0",
                borderBottom: "1px solid #333",
              }}
            >
              <span>
                <strong>{d.titulo}</strong> — {d.artista}{" "}
                {d.anioLanzamiento ? `(${d.anioLanzamiento})` : ""} ·{" "}
                {d.formato} · {d.genero}
              </span>
              <button
                onClick={() => eliminarDisco(d._id)}
                style={{
                  ...buttonPrimary,
                  background: "linear-gradient(135deg, #ef4444, #dc2626)",
                  padding: "0.4rem 1rem",
                  fontSize: "0.85rem",
                }}
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
