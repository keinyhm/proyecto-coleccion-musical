import { useEffect, useState } from "react";

const API_URL = "http://localhost:3000/api/artistas";

export function ArtistasPage() {
  const [artistas, setArtistas] = useState([]);
  const [nombre, setNombre] = useState("");
  const [tipo, setTipo] = useState("banda");
  const [pais, setPais] = useState("");

  // Cargar artistas al entrar en la página
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((data) => setArtistas(data))
      .catch((err) => console.error("Error cargando artistas:", err));
  }, []);

  async function handleSubmit(e) {
    e.preventDefault();

    const nuevo = {
      nombre,
      tipo,
      pais,
      miembros: [],
      generos: [],
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo),
      });

      const creado = await res.json();
      setArtistas([...artistas, creado]);
      setNombre("");
      setPais("");
      setTipo("banda");
    } catch (err) {
      console.error("Error creando artista:", err);
    }
  }

  async function eliminarArtista(id) {
    const confirmar = window.confirm(
      "¿Seguro que quieres eliminar este artista?"
    );
    if (!confirmar) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      setArtistas(artistas.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error eliminando artista:", err);
    }
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5eee5",
        padding: "2rem 1rem",
        display: "flex",
        justifyContent: "center",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: "700px",
          background: "white",
          padding: "2rem",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
        }}
      >
        {/* TÍTULO */}
        <h1
          style={{
            marginTop: 0,
            marginBottom: "1.8rem",
            fontSize: "2.2rem",
          }}
        >
          Artistas
        </h1>

        {/* FORMULARIO / FILTROS */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: "flex",
            gap: "0.8rem",
            flexWrap: "wrap",
            marginBottom: "2rem",
          }}
        >
          <input
            placeholder="Nombre del artista"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
              width: "200px",
            }}
          />

          <select
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
            }}
          >
            <option value="banda">Banda</option>
            <option value="solista">Solista</option>
          </select>

          <input
            placeholder="País"
            value={pais}
            onChange={(e) => setPais(e.target.value)}
            style={{
              padding: "0.6rem 1rem",
              borderRadius: "12px",
              border: "1px solid #ddd",
              width: "180px",
            }}
          />

          {/* BOTÓN AÑADIR */}
          <button
            type="submit"
            style={{
              marginLeft: "auto",
              padding: "0.7rem 1.6rem",
              borderRadius: "999px",
              border: "none",
              background: "linear-gradient(135deg, #f97316, #ea580c)",
              color: "white",
              fontWeight: 600,
              cursor: "pointer",
              boxShadow: "0 6px 14px rgba(234,88,12,0.35)",
            }}
          >
            Añadir artista
          </button>
        </form>

        {/* LISTA */}
        <ul style={{ paddingLeft: "0", fontSize: "1rem", listStyle: "none" }}>
          {artistas.map((a) => (
            <li
              key={a._id}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                marginBottom: "0.8rem",
              }}
            >
              <span>
                {a.nombre} {a.tipo ? `(${a.tipo})` : ""}{" "}
                {a.pais ? `- ${a.pais}` : ""}
              </span>

              <button
                style={{
                  padding: "0.6rem 1.2rem",
                  borderRadius: "999px",
                  border: "none",
                  background:
                    "linear-gradient(135deg, #ef4444, #dc2626)", // rojo bonito
                  color: "white",
                  fontWeight: 600,
                  fontSize: "0.9rem",
                  cursor: "pointer",
                  boxShadow: "0 6px 14px rgba(220,38,38,0.35)",
                }}
                onClick={() => eliminarArtista(a._id)}
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
