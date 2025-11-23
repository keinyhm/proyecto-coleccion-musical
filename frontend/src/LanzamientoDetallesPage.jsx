// frontend/src/LanzamientoDetallePage.jsx
const lanzamientoMock = {
  titulo: "Random Access Memories",
  artista: "Daft Punk",
  anioLanzamiento: 2013,
  formato: "Vinilo",
  sello: "Columbia",
  generos: ["Electrónica", "Disco"],
  portadaUrl:
    "https://upload.wikimedia.org/wikipedia/en/a/a7/Random_Access_Memories.jpg",
  pistas: [
    "Give Life Back to Music",
    "The Game of Love",
    "Giorgio by Moroder",
    "Within",
    "Instant Crush",
  ],
};

const pillStyle = {
  fontSize: "0.8rem",
  backgroundColor: "#f3e3d0",
  padding: "0.3rem 0.9rem",
  borderRadius: "999px",
};

export function LanzamientoDetallePage() {
  const lanzamiento = lanzamientoMock;

  return (
    <div
      style={{
        minHeight: "100vh",
        backgroundColor: "#f5eee5",
        fontFamily: "system-ui, -apple-system, BlinkMacSystemFont, sans-serif",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        padding: "2rem 1rem",
      }}
    >
      {/* TARJETA */}
      <div
        style={{
          width: "100%",
          maxWidth: "480px",
          backgroundColor: "#ffffff",
          borderRadius: "20px",
          boxShadow: "0 10px 25px rgba(0,0,0,0.08)",
          padding: "1.8rem 1.6rem 2.4rem",
        }}
      >
        {/* Portada */}
        <div style={{ textAlign: "center", marginBottom: "1.4rem" }}>
          <img
            src={lanzamiento.portadaUrl}
            alt={lanzamiento.titulo}
            style={{
              width: "100%",
              maxWidth: "260px",
              borderRadius: "16px",
              boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
              objectFit: "cover",
            }}
          />
        </div>

        {/* Título + artista */}
        <h1
          style={{
            margin: 0,
            fontSize: "1.6rem",
            textAlign: "center",
          }}
        >
          {lanzamiento.titulo}
        </h1>
        <p
          style={{
            margin: "0.3rem 0 1rem",
            color: "#666",
            textAlign: "center",
          }}
        >
          {lanzamiento.artista} · {lanzamiento.anioLanzamiento}
        </p>

        {/* Chips */}
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
          <span style={pillStyle}>Sello: {lanzamiento.sello}</span>
          {lanzamiento.generos.map((g) => (
            <span key={g} style={pillStyle}>
              {g}
            </span>
          ))}
        </div>

        {/* Lista de pistas */}
        <h2
          style={{
            fontSize: "1.05rem",
            margin: "0.5rem 0 0.3rem",
          }}
        >
          Lista de pistas
        </h2>
        <ol
          style={{
            paddingLeft: "1.2rem",
            marginTop: 0,
            marginBottom: "1.2rem",
            fontSize: "0.95rem",
          }}
        >
          {lanzamiento.pistas.map((pista, index) => (
            <li key={index} style={{ marginBottom: "0.15rem" }}>
              {pista}
            </li>
          ))}
        </ol>

        {/* Botón */}
        <div style={{ textAlign: "center" }}>
          <button
            style={{
              marginTop: "0.5rem",
              padding: "0.75rem 1.8rem",
              borderRadius: "999px",
              border: "none",
              background:
                "linear-gradient(135deg, #f97316, #ea580c)", // naranja bonito
              color: "white",
              fontWeight: 600,
              fontSize: "0.95rem",
              cursor: "pointer",
              boxShadow: "0 8px 18px rgba(234,88,12,0.45)",
            }}
            onClick={() =>
              alert("Ejemplo: el lanzamiento se añadiría a tu colección")
            }
          >
            + Añadir a mi colección
          </button>
        </div>
      </div>
    </div>
  );
}
