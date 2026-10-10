import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Layout      from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";

// Páginas comunes
import Login        from "./pages/login";   // ← minúscula, igual que el archivo real
import Dashboard    from "./pages/Dashboard";

// Páginas de administrador
import Usuarios         from "./pages/users";
import Departamentos    from "./pages/departments";
import Direcciones      from "./pages/Direcciones";
import Proyectos        from "./pages/Proyectos";
import ProyectoDetalle  from "./pages/ProyectoDetalle";

// Páginas de usuario (Clase 4)
import MiPerfil         from "./pages/MiPerfil";
import MiDepartamento   from "./pages/MiDepartamento";
import MisProyectos     from "./pages/MisProyectos";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Ruta pública */}
        <Route path="/" element={<Login />} />

        {/* Rutas protegidas con Layout */}
        <Route element={<Layout />}>

          {/* Accesibles por cualquier rol autenticado */}
          <Route path="/dashboard" element={
            <ProtectedRoute><Dashboard /></ProtectedRoute>
          } />
          <Route path="/proyectos/:id" element={
            <ProtectedRoute><ProyectoDetalle /></ProtectedRoute>
          } />

          {/* Solo administrador */}
          <Route path="/usuarios" element={
            <ProtectedRoute roles={["admin"]}><Usuarios /></ProtectedRoute>
          } />
          <Route path="/departamentos" element={
            <ProtectedRoute roles={["admin"]}><Departamentos /></ProtectedRoute>
          } />
          <Route path="/direcciones" element={
            <ProtectedRoute roles={["admin"]}><Direcciones /></ProtectedRoute>
          } />
          <Route path="/proyectos" element={
            <ProtectedRoute roles={["admin"]}><Proyectos /></ProtectedRoute>
          } />

          {/* Solo usuario */}
          <Route path="/mi-perfil" element={
            <ProtectedRoute roles={["user"]}><MiPerfil /></ProtectedRoute>
          } />
          <Route path="/mi-departamento" element={
            <ProtectedRoute roles={["user"]}><MiDepartamento /></ProtectedRoute>
          } />
          <Route path="/mis-proyectos" element={
            <ProtectedRoute roles={["user"]}><MisProyectos /></ProtectedRoute>
          } />
        </Route>

        {/* Ruta no encontrada */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}
