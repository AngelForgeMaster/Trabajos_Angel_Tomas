import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getProyecto, asignarUsuario, quitarUsuario } from "../api/projects";
import { getUers } from "../api/users";

export default function ProyectoDetalle() {
  const { id }                     = useParams();
  const [proyecto,    setProyecto] = useState(null);
  const [todosUsr,    setTodosUsr] = useState([]);
  const [seleccionado, setSel]     = useState("");
  const [error,       setError]    = useState("");
  const [mensaje,     setMensaje]  = useState("");

  const token   = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const esAdmin = payload.rol === "admin";

  // ... resto igual

  useEffect(() => { cargarDatos(); }, [id]);

  const cargarDatos = async () => {
    try {
      const resProyecto = await getProyecto(id);
      setProyecto(resProyecto.data);

      if (esAdmin) {
        const resUsuarios = await getUers();
        setTodosUsr(resUsuarios.data);
      }
    } catch { setError("Error al cargar datos."); }
  };

  const handleAsignar = async () => {
    if (!seleccionado) return;
    try {
      const res = await asignarUsuario(id, seleccionado);
      setProyecto(prev => ({
        ...prev,
        empleados: [...prev.empleados, res.data]
      }));
      setSel("");
      setMensaje("✅ Usuario asignado correctamente.");
      setError("");
    } catch { setError("Error al asignar usuario."); }
  };

  const handleQuitar = async (usuarioId) => {
    try {
      await quitarUsuario(id, usuarioId);
      setProyecto(prev => ({
        ...prev,
        empleados: prev.empleados.filter(e => e.id !== usuarioId)
      }));
      setMensaje("✅ Usuario desasignado correctamente.");
      setError("");
    } catch { setError("Error al quitar usuario."); }
  };

  if (!proyecto) return <p className="p-4">Cargando...</p>;

  const asignados   = proyecto.empleados;
  const disponibles = todosUsr.filter(
    u => !asignados.some(e => e.id === u.id)
  );

  return (
    <div className="container-fluid py-3">
      <h2>{proyecto.nombre}</h2>
      <p className="text-muted">{proyecto.descripcion}</p>

      <h5 className="mt-4">Empleados asignados</h5>
      {asignados.length === 0 && (
        <p className="text-muted">Sin empleados asignados.</p>
      )}
      <div className="d-flex flex-wrap gap-2">
        {asignados.map(e => (
          <span key={e.id} className="badge bg-primary d-flex align-items-center gap-1 fs-6">
            {e.nombre}
            {esAdmin && (
              <button
                className="btn-close btn-close-white"
                style={{ fontSize: "0.6rem" }}
                title={`Quitar a ${e.nombre}`}
                onClick={() => handleQuitar(e.id)}
              />
            )}
          </span>
        ))}
      </div>

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
    </div>
  );
}