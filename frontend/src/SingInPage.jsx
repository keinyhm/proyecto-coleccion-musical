// src/SingInPage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const wrapper = {
  minHeight: "100vh",
  backgroundColor: "#1a1a1a",
  display: "flex",
  justifyContent: "center",
  padding: "2rem 1rem",
  color: "white",
};

const card = {
  width: "100%",
  maxWidth: "540px",
  backgroundColor: "#242424",
  borderRadius: "20px",
  padding: "2rem",
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
  padding: "0.75rem 1.8rem",
  borderRadius: "999px",
  border: "none",
  background: "linear-gradient(135deg, #f97316, #ea580c)",
  color: "white",
  fontWeight: 600,
  cursor: "pointer",
  width: "100%",
};

export default function SingInPage() {
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    // lógica de registro real iría aquí
    navigate("/app");
  }

  return (
    <div style={wrapper}>
      <div style={card}>
        <h1 style={{ textAlign: "center" }}>My Vinyls</h1>
        <p style={{ textAlign: "center", color: "#d0d0d0" }}>
          Regístrate para gestionar tus discos
        </p>

        <form
          onSubmit={handleSubmit}
          style={{ display: "flex", flexDirection: "column", gap: "1rem" }}
        >
          <div>
            <label>Usuario</label>
            <input style={inputDark} placeholder="Ingresa tu usuario" />
          </div>

          <div>
            <label>Correo</label>
            <input
              style={inputDark}
              placeholder="Ingresa tu correo"
            />
          </div>

          <div>
            <label>Contraseña</label>
            <input
              style={inputDark}
              type="password"
              placeholder="Crea una contraseña"
            />
          </div>

          <div>
            <label>Fecha de nacimiento</label>
            <div style={{ display: "flex", gap: "0.6rem" }}>
              <input
                style={{ ...inputDark, width: "90px" }}
                placeholder="Año"
              />
              <select style={{ ...inputDark, width: "120px" }}>
                <option>Mes</option>
              </select>
              <input
                style={{ ...inputDark, width: "70px" }}
                placeholder="Día"
              />
            </div>
          </div>

          <button style={buttonPrimary} type="submit">
            Registrarse
          </button>
        </form>

        <p
          style={{
            marginTop: "1.2rem",
            textAlign: "center",
            fontSize: "0.9rem",
          }}
        >
          ¿Ya tienes una cuenta?{" "}
          <span
            style={{ color: "#f97316", cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Acceder
          </span>
        </p>
      </div>
    </div>
  );
}
