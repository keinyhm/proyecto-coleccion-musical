// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import LandingPage from "./LandingPage.jsx";
import LoginPage from "./LoginPage.jsx";
import SingInPage from "./SingInPage.jsx";

// Páginas de usuario logueado
import HomeUserPage from "./HomeUserPage.jsx";
import ExplorerDiscosPage from "./ExplorerDiscosPage.jsx";
import ColeccionPage from "./ColeccionPage.jsx";
import PerfilPage from "./PerfilPage.jsx";

// Otras pantallas
import { ArtistasPage } from "./ArtistasPage.jsx";
import { LanzamientoDetallesPage } from "./LanzamientoDetallesPage.jsx";
import AdminDiscosPage from "./AdminDiscosPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingInPage />} />

        {/* APP LOGUEADA */}
        <Route path="/app" element={<HomeUserPage />} />
        <Route path="/explorar" element={<ExplorerDiscosPage />} />
        <Route path="/coleccion" element={<ColeccionPage />} />
        <Route path="/perfil" element={<PerfilPage />} />

        {/* EXTRAS */}
        <Route path="/artistas" element={<ArtistasPage />} />
        <Route path="/lanzamiento" element={<LanzamientoDetallesPage />} />

        {/* ADMIN */}
        <Route path="/admin/discos" element={<AdminDiscosPage />} />
      </Routes>
    </BrowserRouter>
  );
}
