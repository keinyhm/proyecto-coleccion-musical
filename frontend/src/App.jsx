// src/App.jsx
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Páginas públicas
import LandingPage from "./pages/LandingPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import SingInPage from "./pages/SingInPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

// Páginas de usuario logueado
import HomeUserPage from "./pages/HomeUserPage.jsx";
import ExplorerDiscosPage from "./pages/ExplorerDiscosPage.jsx";
import ColeccionPage from "./pages/ColeccionPage.jsx";
import PerfilPage from "./pages/PerfilPage.jsx";

// Otras pantallas
import { ArtistasPage } from "./pages/ArtistasPage.jsx";
import { LanzamientoDetallesPage } from "./pages/LanzamientoDetallesPage.jsx";
import AdminDiscosPage from "./pages/AdminDiscosPage.jsx";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PÚBLICAS */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<HomeUserPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SingInPage />} />
        <Route path="/register" element={<RegisterPage />} />

        {/* APP LOGUEADA */}
        <Route path="/app" element={<HomeUserPage />} />
        <Route path="/explorar" element={<ExplorerDiscosPage />} />
        <Route path="/coleccion" element={<ColeccionPage />} />
        <Route path="/perfil" element={<PerfilPage />} />

        {/* EXTRAS */}
        <Route path="/artistas" element={<ArtistasPage />} />
        <Route path="/lanzamiento/:id" element={<LanzamientoDetallesPage />} />
        {/* ADMIN */}
        <Route path="/admin/discos" element={<AdminDiscosPage />} />
      </Routes>
    </BrowserRouter>
  );
}
