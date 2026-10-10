import { Navigate } from "react-router-dom";

/**
 * ProtectedRoute — Versión Clase 4
 * @param {React.ReactNode} children  - Componente a proteger
 * @param {string[]}        roles     - Roles permitidos. Ej: ["admin"] o ["user"] o ["admin","user"]
 *                                      Si no se pasa, cualquier rol autenticado puede acceder.
 */
export default function ProtectedRoute({ children, roles = [] }) {
  const token = localStorage.getItem("token");

  // 1. Sin token → redirigir al login
  if (!token) return <Navigate to="/" replace />;

  // 2. Si se especificaron roles, verificar que el token los tenga
  if (roles.length > 0) {
    const payload = JSON.parse(atob(token.split(".")[1]));
    const rolUsuario = payload.rol;

    if (!roles.includes(rolUsuario)) {
      // El usuario está autenticado pero no tiene el rol necesario
      // Redirigir según su rol real
      if (rolUsuario === "admin") return <Navigate to="/dashboard" replace />;
      return <Navigate to="/mi-perfil" replace />;
    }
  }

  // 3. Token válido y rol correcto → mostrar la página
  return children;
}
