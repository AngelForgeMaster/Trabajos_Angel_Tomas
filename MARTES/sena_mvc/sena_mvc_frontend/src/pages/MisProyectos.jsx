import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getMe } from "../api/users";
import { getProyectos } from "../api/projects";

export default function MisProyectos() {
  const [proyectos, setProyectos] = useState([]);
  const [error, setError]         = useState("");
  const [cargando, setCargando]   = useState(true);
  const navigate                  = useNavigate();

  useEffect(() => {
    cargarMisProyectos();
  }, []);

  async function cargarMisProyectos() {
    try {
      // 1. Obtener id del usuario autenticado
      const resPerfil  = await getMe();
      const userId     = resPerfil.data.id;

      // 2. Obtener todos los proyectos
      const resProyectos = await getProyectos();

      // 3. Filtrar solo los proyectos donde el usuario aparece como empleado
      const misProy = resProyectos.data.filter(p =>
        Array.isArray(p.empleados) &&
        p.empleados.some(e => e.id === userId)
      );

      setProyectos(misProy);
    } catch (e) {
      setError("Error al cargar tus proyectos.");
    } finally {
      setCargando(false);
    }
  }

  if (cargando) return <p className="p-4">Cargando proyectos...</p>;
  if (error)    return <p className="p-4 text-danger">{error}</p>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">📋 Mis Proyectos</h2>

      {proyectos.length === 0 ? (
        <div className="alert alert-info">
          No estás asignado a ningún proyecto todavía.
          Contacta al administrador para que te agregue a un proyecto.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Compañeros</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {proyectos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td><strong>{p.nombre}</strong></td>
                  <td>{p.descripcion || "—"}</td>
                  <td>
                    <span className="badge bg-primary">{p.estado || "Activo"}</span>
                  </td>
                  <td>
                    <span className="badge bg-secondary">
                      {p.empleados ? p.empleados.length : 0} personas
                    </span>
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => navigate(`/proyectos/${p.id}`)}
                    >
                      Ver detalle
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
