import { useState, useEffect } from "react";
import { getDepartment, creatDepartment, updateDepartment, deleteDepartment } from "../api/departments";
import { getDirecciones } from "../api/addresses";
import { exportarDepartamentosExcel } from "../api/reports";
import { descargarBlob } from "../utils/descargarArchivo";

export default function Departments() {

  const [deptos,       setDeptos]      = useState([]);
  const [direcciones,  setDirecciones] = useState([]);
  const [nombre,       setNombre]      = useState("");
  const [codigo,       setCodigo]      = useState("");
  const [editando,     setEditando]    = useState(null);
  const [editNombre,   setEditNombre]  = useState("");
  const [editCodigo,   setEditCodigo]  = useState("");
  const [editDirId,    setEditDirId]   = useState("");
  const [error,        setError]       = useState("");

  const token   = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const esAdmin = payload.rol === "admin";

  useEffect(() => {
    cargarDeptos();
    cargarDirecciones();
  }, []);

  const cargarDeptos = async () => {
    try {
      const res = await getDepartment();
      setDeptos(res.data);
    } catch { setError("Error al cargar departamentos."); }
  };

  const cargarDirecciones = async () => {
    try {
      const res = await getDirecciones();
      setDirecciones(res.data);
    } catch { /* silencioso */ }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await creatDepartment({ nombre, codigo });
      setNombre(""); setCodigo("");
      cargarDeptos();
    } catch { setError("Error al crear. ¿Tiene rol admin?"); }
  };

  const iniciarEdicion = (d) => {
    setEditando(d.id);
    setEditNombre(d.nombre);
    setEditCodigo(d.codigo);
    setEditDirId(d.direccion_id ?? "");
  };

  const handleActualizar = async (id) => {
    try {
      await updateDepartment(id, {
        nombre: editNombre,
        codigo: editCodigo,
        direccion_id: editDirId === "" ? null : Number(editDirId)
      });
      setEditando(null);
      cargarDeptos();
    } catch { setError("Error al actualizar departamento."); }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este departamento?")) return;
    try {
      await deleteDepartment(id);
      cargarDeptos();
    } catch { setError("Error al eliminar departamento."); }
  };

  const handleExportar = async () => {
    try {
      const res = await exportarDepartamentosExcel();
      descargarBlob(res.data, "departamentos.xlsx");
    } catch { setError("Error al exportar a Excel."); }
  };

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Departamentos</h2>
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
        <div className="col-md-4">
          <input className="form-control" placeholder="Código"
            value={codigo} onChange={e => setCodigo(e.target.value)} required />
        </div>
        <div className="col-md-4">
          <button className="btn btn-primary w-100">Crear Departamento</button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Nombre</th><th>Código</th>
            <th>Dirección</th><th>Editar</th><th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {deptos.map(d => (
            <tr key={d.id}>
              <td>{d.id}</td>
              <td>{editando === d.id
                ? <input className="form-control form-control-sm"
                    value={editNombre} onChange={e => setEditNombre(e.target.value)} />
                : d.nombre}
              </td>
              <td>{editando === d.id
                ? <input className="form-control form-control-sm"
                    value={editCodigo} onChange={e => setEditCodigo(e.target.value)} />
                : d.codigo}
              </td>
              <td>{editando === d.id
                ? <select className="form-select form-select-sm"
                    value={editDirId} onChange={e => setEditDirId(e.target.value)}>
                    <option value="">Sin dirección</option>
                    {direcciones.map(dir =>
                      <option key={dir.id} value={dir.id}>{dir.nombre}</option>
                    )}
                  </select>
                : d.direccion?.nombre ?? <span className="text-muted">—</span>}
              </td>
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