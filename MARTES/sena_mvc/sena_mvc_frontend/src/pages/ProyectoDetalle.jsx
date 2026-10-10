import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProyecto, asignarUsuario } from "../api/projects";
import { getUers } from "../api/users";
import Layout from "../components/Layout";

export default function ProyectoDetalle() {

  const { id }                   = useParams();
  const [proyecto,  setProyecto] = useState(null);
  const [todosUsr,  setTodosUsr] = useState([]);
  const [seleccionado, setSel]   = useState("");
  const [error,     setError]    = useState("");
  const [mensaje,   setMensaje]  = useState("");

  const token   = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const esAdmin = payload.rol === "admin";

  useEffect(() => { cargarDatos(); }, [id]);

  const cargarDatos = async () => {
    try {
      // getProyecto devuelve { id, nombre, descripcion, empleados[] }
      // gracias a ProyectoDetalleResponse en el backend (Actividad 6)
      const [resProyecto, resUsuarios] = await Promise.all([
        getProyecto(id),
        getUers()
      ]);
      setProyecto(resProyecto.data);
      setTodosUsr(resUsuarios.data);
    } catch { setError("Error al cargar datos."); }
  };

  const handleAsignar = async () => {
    if (!seleccionado) return;
    try {
      const res = await asignarUsuario(id, seleccionado);
      // Agrega el usuario asignado a la lista local sin recargar
      setProyecto(prev => ({
        ...prev,
        empleados: [...prev.empleados, res.data]
      }));
      setSel("");
      setMensaje("Usuario asignado correctamente.");
    } catch { setError("Error al asignar usuario."); }
  };

  // Guard: mientras el proyecto carga, proyecto es null
  if (!proyecto) {
    return <Layout><p>Cargando...</p></Layout>;
  }

  // Usuarios que aún no están asignados a este proyecto
  const asignados   = proyecto.empleados;
  const disponibles = todosUsr.filter(
    u => !asignados.some(e => e.id === u.id)
  );

  return (
    <Layout>
      <h2>{proyecto.nombre}</h2>
      <p className="text-muted">{proyecto.descripcion}</p>

      <h5 className="mt-4">Empleados asignados</h5>
      {asignados.length === 0 && (
        <p className="text-muted">Sin empleados asignados.</p>
      )}
      {asignados.map(e => (
        <span key={e.id} className="badge bg-primary me-2 mb-1">
          {e.nombre}
        </span>
      ))}

      {esAdmin && (
        <div className="mt-4">
          <h5>Asignar usuario al proyecto</h5>
          {disponibles.length === 0 ? (
            <p className="text-muted">Todos los usuarios ya están asignados.</p>
          ) : (
            <div className="d-flex gap-2">
              <select className="form-select w-auto"
                value={seleccionado}
                onChange={e => setSel(e.target.value)}>
                <option value="">-- Seleccionar usuario --</option>
                {disponibles.map(u => (
                  <option key={u.id} value={u.id}>{u.nombre}</option>
                ))}
              </select>
              <button className="btn btn-success"
                onClick={handleAsignar}>Asignar</button>
            </div>
          )}
        </div>
      )}

      {mensaje && <div className="alert alert-success mt-3">{mensaje}</div>}
      {error   && <div className="alert alert-danger  mt-3">{error}</div>}
    </Layout>
  );
}
