import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getProyectos, createProyecto,
  updateProyecto, deleteProyecto } from "../api/projects";
import { exportarProyectosExcel } from "../api/reports";
import { descargarBlob } from "../utils/descargarArchivo";
// import Layout from "../components/Layout";

export default function Proyectos() {
  const [proyectos,  setProyectos]  = useState([]);
  const [nombre,     setNombre]     = useState("");
  const [descripcion,setDesc]       = useState("");
  const [editando,   setEditando]   = useState(null);
  const [editNombre, setEditNombre] = useState("");
  const [editDesc,   setEditDesc]   = useState("");
  const [error,      setError]      = useState("");
  const navigate = useNavigate();

  const token   = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const esAdmin = payload.rol === "admin";

  useEffect(() => { cargarProyectos(); }, []);

  const cargarProyectos = async () => {
    try {
      const res = await getProyectos();
      setProyectos(res.data);
    } catch { setError("Error al cargar proyectos."); }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await createProyecto({ nombre, descripcion });
      setNombre(""); setDesc(""); cargarProyectos();
    } catch { setError("Error al crear proyecto."); }
  };

  const iniciarEdicion = (p) => {
    setEditando(p.id); setEditNombre(p.nombre);
    setEditDesc(p.descripcion || "");
  };

  const handleActualizar = async (id) => {
    try {
      await updateProyecto(id,
        { nombre: editNombre, descripcion: editDesc });
      setEditando(null); cargarProyectos();
    } catch { setError("Error al actualizar proyecto."); }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este proyecto?")) return;
    try {
      await deleteProyecto(id); cargarProyectos();
    } catch { setError("Error al eliminar proyecto."); }
  };

  const handleExportar = async () => {
    try {
      const res = await exportarProyectosExcel();
      descargarBlob(res.data, "proyectos.xlsx");
    } catch { setError("Error al exportar a Excel."); }
  };

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Proyectos</h2>
        {esAdmin && (
          <button className="btn btn-success" onClick={handleExportar}>
            Exportar a Excel
          </button>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleCrear} className="row g-2 mb-4">
        <div className="col-md-4">
          <input className="form-control" placeholder="Nombre"
            value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="col-md-5">
          <input className="form-control" placeholder="Descripción"
            value={descripcion} onChange={e => setDesc(e.target.value)} />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">Crear</button>
        </div>
      </form>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Nombre</th><th>Descripción</th>
            <th>Detalle</th>
            {esAdmin && <th>Editar</th>}
            {esAdmin && <th>Eliminar</th>}
          </tr>
        </thead>
        <tbody>
          {proyectos.map(p => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{editando === p.id
                ? <input className="form-control form-control-sm"
                    value={editNombre}
                    onChange={e => setEditNombre(e.target.value)} />
                : p.nombre}</td>
              <td>{editando === p.id
                ? <input className="form-control form-control-sm"
                    value={editDesc}
                    onChange={e => setEditDesc(e.target.value)} />
                : p.descripcion}</td>
              <td>
                <button className="btn btn-info btn-sm"
                  onClick={() => navigate(`/proyectos/${p.id}`)}>
                  Ver detalle
                </button>
              </td>
              {esAdmin && (<td>
                {editando === p.id ? (
                  <div className="d-flex gap-1">
                    <button className="btn btn-success btn-sm"
                      onClick={() => handleActualizar(p.id)}>Guardar</button>
                    <button className="btn btn-secondary btn-sm"
                      onClick={() => setEditando(null)}>Cancelar</button>
                  </div>
                ) : (
                  <button className="btn btn-warning btn-sm"
                    onClick={() => iniciarEdicion(p)}>Editar</button>
                )}
              </td>)}
              {esAdmin && (<td>
                <button className="btn btn-danger btn-sm"
                  onClick={() => handleEliminar(p.id)}>Eliminar</button>
              </td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
