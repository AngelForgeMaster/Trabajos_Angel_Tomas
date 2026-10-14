import { useState, useEffect } from "react";
import { getUers, creatUsers, updateUsers, deleteUsers } from "../api/users";
import { getDepartment } from "../api/departments";
import { exportarUsuariosExcel } from "../api/reports";
import { descargarBlob } from "../utils/descargarArchivo";

export default function Users() {

  const [usuarios,    setUsuarios]   = useState([]);
  const [deptos,      setDeptos]     = useState([]);
  const [nombre,      setNombre]     = useState("");
  const [email,       setEmail]      = useState("");
  const [password,    setPassword]   = useState("");
  const [editando,    setEditando]   = useState(null);
  const [editNombre,  setEditNombre] = useState("");
  const [editEmail,   setEditEmail]  = useState("");
  const [editDeptoId, setEditDeptoId]= useState("");
  const [error,       setError]      = useState("");

  const token   = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const esAdmin = payload.rol === "admin";

  useEffect(() => {
    cargarUsuarios();
    cargarDeptos();
  }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await getUers();
      setUsuarios(res.data);
    } catch {
      setError("Error al cargar usuarios. ¿Tiene rol admin?");
    }
  };

  const cargarDeptos = async () => {
    try {
      const res = await getDepartment();
      setDeptos(res.data);
    } catch { /* silencioso */ }
  };

  const handleCrear = async (e) => {
    e.preventDefault();
    try {
      await creatUsers({ nombre, email, password, rol: "user" });
      setNombre(""); setEmail(""); setPassword("");
      cargarUsuarios();
    } catch { setError("Error al crear usuario."); }
  };

  const iniciarEdicion = (u) => {
    setEditando(u.id);
    setEditNombre(u.nombre);
    setEditEmail(u.email);
    setEditDeptoId(u.departamento_id ?? "");
  };

  const handleActualizar = async (id) => {
    try {
      await updateUsers(id, {
        nombre: editNombre,
        email: editEmail,
        departamento_id: editDeptoId === "" ? null : Number(editDeptoId)
      });
      setEditando(null);
      cargarUsuarios();
    } catch { setError("Error al actualizar usuario."); }
  };

  const handleEliminar = async (id) => {
    if (!window.confirm("¿Eliminar este usuario?")) return;
    try {
      await deleteUsers(id);
      cargarUsuarios();
    } catch { setError("Error al eliminar usuario."); }
  };

  const handleExportar = async () => {
    try {
      const res = await exportarUsuariosExcel();
      descargarBlob(res.data, "usuarios.xlsx");
    } catch { setError("Error al exportar a Excel."); }
  };

  return (
    <div className="container-fluid py-3">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Usuarios</h2>
        {esAdmin && (
          <button className="btn btn-success" onClick={handleExportar}>
            Exportar a Excel
          </button>
        )}
      </div>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleCrear} className="row g-2 mb-4">
        <div className="col-md-3">
          <input className="form-control" placeholder="Nombre"
            value={nombre} onChange={e => setNombre(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <input className="form-control" placeholder="Correo"
            value={email} onChange={e => setEmail(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <input type="password" className="form-control" placeholder="Contraseña"
            value={password} onChange={e => setPassword(e.target.value)} required />
        </div>
        <div className="col-md-3">
          <button className="btn btn-primary w-100">Crear Usuario</button>
        </div>
      </form>

      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>ID</th><th>Nombre</th><th>Correo</th>
            <th>Rol</th><th>Departamento</th><th>Editar</th><th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{editando === u.id
                ? <input className="form-control form-control-sm"
                    value={editNombre} onChange={e => setEditNombre(e.target.value)} />
                : u.nombre}
              </td>
              <td>{editando === u.id
                ? <input className="form-control form-control-sm"
                    value={editEmail} onChange={e => setEditEmail(e.target.value)} />
                : u.email}
              </td>
              <td>{u.rol}</td>
              <td>{editando === u.id
                ? <select className="form-select form-select-sm"
                    value={editDeptoId} onChange={e => setEditDeptoId(e.target.value)}>
                    <option value="">Sin departamento</option>
                    {deptos.map(d =>
                      <option key={d.id} value={d.id}>{d.nombre}</option>
                    )}
                  </select>
                : u.departamento?.nombre ?? <span className="text-muted">—</span>}
              </td>
              <td>{editando === u.id ? (
                <div className="d-flex gap-1">
                  <button className="btn btn-success btn-sm"
                    onClick={() => handleActualizar(u.id)}>Guardar</button>
                  <button className="btn btn-secondary btn-sm"
                    onClick={() => setEditando(null)}>Cancelar</button>
                </div>
              ) : (
                <button className="btn btn-warning btn-sm"
                  onClick={() => iniciarEdicion(u)}>Editar</button>
              )}</td>
              <td><button className="btn btn-danger btn-sm"
                onClick={() => handleEliminar(u.id)}>Eliminar</button></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}