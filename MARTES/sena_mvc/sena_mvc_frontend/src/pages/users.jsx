import { useState, useEffect } from "react";
import { getUers, creatUsers, updateUsers, deleteUsers }
  from "../api/users";
import Layout from "../components/Layout";

export default function Users() {

  const [usuarios,   setUsuarios]  = useState([]);
  const [nombre,     setNombre]    = useState("");
  const [email,      setEmail]     = useState("");
  const [password,   setPassword]  = useState("");
  const [editando,   setEditando]  = useState(null);
  const [editNombre, setEditNombre]= useState("");
  const [editEmail,  setEditEmail] = useState("");
  const [error,      setError]     = useState("");

  useEffect(() => { cargarUsuarios(); }, []);

  const cargarUsuarios = async () => {
    try {
      const res = await getUers();
      setUsuarios(res.data);
    } catch {
      setError("Error al cargar usuarios. ¿Tiene rol admin?");
    }
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
  };

  const handleActualizar = async (id) => {
    try {
      await updateUsers(id, { nombre: editNombre, email: editEmail });
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

  return (
    <Layout>
      <h2>Usuarios</h2>
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
          <input type="password" className="form-control"
            placeholder="Contraseña"
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
            <th>Rol</th><th>Editar</th><th>Eliminar</th>
          </tr>
        </thead>
        <tbody>
          {usuarios.map(u => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{editando === u.id
                ? <input className="form-control form-control-sm"
                    value={editNombre}
                    onChange={e => setEditNombre(e.target.value)} />
                : u.nombre}</td>
              <td>{editando === u.id
                ? <input className="form-control form-control-sm"
                    value={editEmail}
                    onChange={e => setEditEmail(e.target.value)} />
                : u.email}</td>
              <td>{u.rol}</td>
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
    </Layout>
  );
}
