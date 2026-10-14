import { NavLink, useNavigate, useLocation } from "react-router-dom";

export default function Sidebar() {
  const navigate = useNavigate();
  //const location = useLocation(); // ← fuerza re-render en cada navegación
  useLocation(); // re-render en cada cambio de ruta
  const token   = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const esAdmin = payload.rol === "admin";

  function cerrarSesion() {
    localStorage.removeItem("token");
    navigate("/");
  }

  return (
    <div className="d-flex flex-column p-3 bg-dark text-white"
         style={{ width: 220, minHeight: "100vh" }}>
      <h5 className="text-success mb-4">SENA MVC</h5>

      <NavLink to="/dashboard" className="nav-link text-white mb-1">
        🏠 Dashboard
      </NavLink>

      {esAdmin && (
        <>
          <NavLink to="/usuarios"      className="nav-link text-white mb-1">👥 Usuarios</NavLink>
          <NavLink to="/departamentos" className="nav-link text-white mb-1">🏢 Departamentos</NavLink>
          <NavLink to="/proyectos"     className="nav-link text-white mb-1">📋 Proyectos</NavLink>
          <NavLink to="/direcciones"   className="nav-link text-white mb-1">📍 Direcciones</NavLink>
        </>
      )}

      {!esAdmin && (
        <>
          <NavLink to="/mi-perfil"       className="nav-link text-white mb-1">👤 Mi Perfil</NavLink>
          <NavLink to="/mi-departamento" className="nav-link text-white mb-1">🏢 Mi Departamento</NavLink>
          <NavLink to="/mis-proyectos"   className="nav-link text-white mb-1">📋 Mis Proyectos</NavLink>
        </>
      )}

      <div className="mt-3 mb-2">
        <span className={`badge ${esAdmin ? "bg-danger" : "bg-primary"} w-100`}>
          {esAdmin ? "👑 Administrador" : "🙋 Usuario"}
        </span>
      </div>

      <button onClick={cerrarSesion} className="btn btn-outline-danger mt-auto">
        Cerrar sesión
      </button>
    </div>
  );
}