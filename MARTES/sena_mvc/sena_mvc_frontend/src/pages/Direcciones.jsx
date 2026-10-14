import { useState, useEffect } from "react";
import { getDirecciones, createDireccion,
  updateDireccion, deleteDireccion } from "../api/addresses";
import { exportarDireccionesExcel } from "../api/reports";
import { descargarBlob } from "../utils/descargarArchivo";
// import Layout from "../components/Layout";

export default function Direcciones() {
  const [direcciones, setDirecciones] = useState([]);
  const [nombre,      setNombre]      = useState("");
  const [editando,    setEditando]    = useState(null);
  const [editNombre,  setEditNombre]  = useState("");
  const [error,       setError]       = useState("");

  const token   = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const esAdmin = payload.rol === "admin";

  useEffect(() => { cargarDirecciones(); }, []);

  const cargarDirecciones = async () => {
    try {
      const res = await getDirecciones();
      setDirecciones(res.data);
    } catch { setError("Error al cargar direcciones."); }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await createDireccion({ nombre });
      setNombre(""); cargarDirecciones();
    } catch { setError("Error al crear. ¿Tiene rol admin?"); }
  };

  const iniciarEdicion = (d) => { setEditando(d.id); setEditNombre(d.nombre); };

  const handleActualizar = async (id) => {
    try {
      await updateDireccion(id, { nombre: editNombre });
      setEditando(null); cargarDirecciones();
    } catch { setError("Error al actualizar dirección."); }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar esta dirección?")) return;
    try {
      await deleteDireccion(id); cargarDirecciones();
    } catch { setError("Error al eliminar dirección."); }
  };

  const handleExportar = async () => {
    try {
      const res = await exportarDireccionesExcel();
      descargarBlob(res.data, "direcciones.xlsx");
    } catch { setError("Error al exportar a Excel."); }
  };

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Direcciones</h2>
        {esAdmin && (
          <button className="btn btn-success" onClick={handleExportar}>
            Exportar a Excel
          </button>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleCrear} className="row g-2 mb-4">
        <div className="col-md-9">
          <input className="form-control" placeholder="Nombre"
            value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">Crear Dirección</button>
        </div>
      </form>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr><th>ID</th><th>Nombre</th><th>Editar</th><th>Eliminar</th></tr>
        </thead>
        <tbody>
          {direcciones.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{editando === d.id
                ? <input className="form-control form-control-sm"
                    value={editNombre}
                    onChange={e => setEditNombre(e.target.value)} />
                : d.nombre}</td>
              <td>{editando === d.id ? (
                <div className="d-flex gap-1">
                  <button className="btn btn-success btn-sm"
                    onClick={() => handleActualizar(d.id)}>Guardar</button>
                  <button className="btn btn-secondary btn-sm"
                    onClick={() => setEditando(null)}>Cancelar</button>
                </div>
              ) : (
                <button className="btn btn-warning btn-sm"
                  onClick={() => iniciarEdicion(d)}>Editar</button>
              )}</td>
              <td><button className="btn btn-danger btn-sm"
                onClick={() => handleEliminar(d.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
