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
      generos: []
    };

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(nuevo)
      });

      const creado = await res.json();
      setArtistas([...artistas, creado]);
      setNombre("");
      setPais("");
    } catch (err) {
      console.error("Error creando artista:", err);
    }
  }

    async function eliminarArtista(id) {
    const confirmar = window.confirm("¿Seguro que quieres eliminar este artista?");
    if (!confirmar) return;

    try {
      await fetch(`${API_URL}/${id}`, {
        method: "DELETE"
      });

      setArtistas(artistas.filter((a) => a._id !== id));
    } catch (err) {
      console.error("Error eliminando artista:", err);
    }
  }

  return (
    <div style={{ padding: "1.5rem", fontFamily: "system-ui" }}>
      <h1>Artistas</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          placeholder="Nombre del artista"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />

        <select
          value={tipo}
          onChange={(e) => setTipo(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        >
          <option value="banda">Banda</option>
          <option value="solista">Solista</option>
        </select>

        <input
          placeholder="País"
          value={pais}
          onChange={(e) => setPais(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />

        <button type="submit">Añadir artista</button>
      </form>

         <ul>
        {artistas.map((a) => (
          <li key={a._id} style={{ marginBottom: "0.5rem" }}>
            {a.nombre} ({a.tipo}) {a.pais && `- ${a.pais}`}
            <button
              onClick={() => eliminarArtista(a._id)}
              style={{ marginLeft: "0.5rem" }}
            >
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
