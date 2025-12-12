import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

const API = "http://localhost:3000/api";

const wrapper = { minHeight: "100vh", background: "#1a1a1a", color: "white", padding: "2rem" };
const inputDark = { padding: "0.6rem 1rem", borderRadius: "12px", border: "1px solid #333", background: "#222", color: "white", width: 320, boxSizing: "border-box" };
const buttonPrimary = { padding: "0.8rem 1.4rem", borderRadius: "999px", border: "none", background: "linear-gradient(135deg, #f97316, #ea580c)", color: "white", fontWeight: 600, cursor: "pointer", width: "fit-content" };
const buttonSecondary = { padding: "0.55rem 1rem", borderRadius: "999px", border: "1px solid #f97316", background: "transparent", color: "white", cursor: "pointer" };

export default function PerfilPage() {
  const navigate = useNavigate();

  // Obtener el ID del usuario logueado
  const userId = useMemo(() => {
    return localStorage.getItem("userId") || "usuario_prueba"; // ID por defecto para pruebas
  }, []);

  const [perfil, setPerfil] = useState(null);
  const [albumes, setAlbumes] = useState(0);
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  // Cargar Perfil y Contar Álbumes
  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    (async () => {
      try {
        setLoading(true);
        setErrorMsg("");

        // 1. Cargar datos del perfil (nombre, correo, avatar)
        const resPerfil = await fetch(`${API}/usuarios/${userId}`);
        if (!resPerfil.ok) throw new Error("No se pudo cargar el perfil");
        const dataPerfil = await resPerfil.json();

        // 2. Contar álbumes usando la ruta Coleccion/count
        const resCount = await fetch(`${API}/usuarios/${userId}/albumes/count`);
        if (!resCount.ok) throw new Error("No se pudo contar álbumes");
        const dataCount = await resCount.json();

        setPerfil(dataPerfil);
        setAvatarUrl(dataPerfil?.avatar?.url || "");
        setAlbumes(dataCount?.total || 0);
      } catch (e) {
        setErrorMsg(e.message || "Error desconocido");
      } finally {
        setLoading(false);
      }
    })();
  }, [userId]);

  // Actualizar Avatar
  async function actualizarAvatar() {
    if (!avatarUrl.trim()) return;

    try {
      const res = await fetch(`${API}/usuarios/${userId}/avatar`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ url: avatarUrl }),
      });

      if (!res.ok) throw new Error("No se pudo actualizar el avatar");
      const actualizado = await res.json();
      setPerfil(actualizado);
      alert("Avatar actualizado ✅");
    } catch (e) {
      alert(e.message || "No se pudo actualizar el avatar");
    }
  }

  function cerrarSesion() {
    localStorage.removeItem("userId");
    localStorage.removeItem("usuario");
    navigate("/login");
  }

  if (loading) return <p style={{ padding: 20 }}>Cargando perfil…</p>;
  if (errorMsg) return <p style={{ padding: 20 }}>Error: {errorMsg}</p>;
  if (!perfil) return <p style={{ padding: 20 }}>No se pudo cargar el perfil.</p>;

  const miembroDesde = perfil.fechaRegistro
    ? new Date(perfil.fechaRegistro).getFullYear()
    : "—";

  return (
    <div style={wrapper}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <button onClick={() => navigate(-1)} style={{ background: "transparent", color: "white", border: "none", cursor: "pointer" }}>
          ← Volver
        </button>
        <button onClick={cerrarSesion} style={buttonSecondary}>
          Cerrar sesión
        </button>
      </div>

      <h1 style={{ marginTop: "1rem" }}>Mi Perfil</h1>

      <div style={{ display: "flex", alignItems: "center", gap: "1.5rem", margin: "1.5rem 0", borderBottom: "1px solid #333", paddingBottom: "1.5rem" }}>
        
        {/* AVATAR */}
        <div
          style={{
            width: 100,
            height: 100,
            borderRadius: "50%",
            background: "#000",
            backgroundImage: perfil?.avatar?.url ? `url(${perfil.avatar.url})` : "none",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />

        {/* INPUT DE AVATAR */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
          <input
            value={avatarUrl}
            onChange={(e) => setAvatarUrl(e.target.value)}
            placeholder="Pega URL de tu foto"
            style={inputDark}
          />
          <button onClick={actualizarAvatar} style={buttonPrimary}>
            Actualizar foto de perfil
          </button>
        </div>
      </div>

      {/* DETALLES DEL USUARIO */}
      <div style={{ borderTop: "1px solid #333" }}>
        <Fila label="Nombre de usuario" value={perfil.nombre || "—"} />
        <Fila label="Correo electrónico" value={perfil.correo || "—"} />
        <Fila label="Álbumes en colección" value={albumes} />
        <Fila label="Miembro desde" value={miembroDesde} />
      </div>
    </div>
  );
}

function Fila({ label, value }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderBottom: "1px solid #333" }}>
      <strong>{label}</strong>
      <span style={{ color: "#ddd" }}>{value}</span>
    </div>
  );
}