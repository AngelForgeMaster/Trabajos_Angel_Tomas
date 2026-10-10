import { useState, useEffect } from "react";
import { getMe, updateUsers } from "../api/users";

export default function MiPerfil() {
  const [perfil, setPerfil]       = useState(null);
  const [editando, setEditando]   = useState(false);
  const [email, setEmail]         = useState("");
  const [password, setPassword]   = useState("");
  const [mensaje, setMensaje]     = useState("");
  const [error, setError]         = useState("");
  const [cargando, setCargando]   = useState(true);

  useEffect(() => {
    cargarPerfil();
  }, []);

  async function cargarPerfil() {
    try {
      const res = await getMe();
      setPerfil(res.data);
      setEmail(res.data.email);
    } catch (e) {
      setError("No se pudo cargar el perfil.");
    } finally {
      setCargando(false);
    }
  }

  async function guardarCambios(e) {
    e.preventDefault();
    setMensaje("");
    setError("");
    try {
      const datos = { email };
      if (password.trim() !== "") datos.password = password;
      await updateUsers(perfil.id, datos);
      setMensaje("✅ Perfil actualizado correctamente.");
      setEditando(false);
      setPassword("");
      cargarPerfil();
    } catch (e) {
      setError("Error al actualizar. Verifica los datos.");
    }
  }

  if (cargando) return <p className="p-4">Cargando perfil...</p>;
  if (!perfil)  return <p className="p-4 text-danger">{error}</p>;

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">👤 Mi Perfil</h2>

      {mensaje && <div className="alert alert-success">{mensaje}</div>}
      {error   && <div className="alert alert-danger">{error}</div>}

      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <table className="table table-borderless mb-0">
            <tbody>
              <tr>
                <th style={{ width: "40%" }}>Nombre</th>
                <td>{perfil.nombre}</td>
              </tr>
              <tr>
                <th>Email</th>
                <td>{perfil.email}</td>
              </tr>
              <tr>
                <th>Rol</th>
                <td>
                  <span className={`badge ${perfil.rol === "admin"
                    ? "bg-danger" : "bg-primary"}`}>
                    {perfil.rol}
                  </span>
                </td>
              </tr>
              <tr>
                <th>Departamento ID</th>
                <td>{perfil.departamento_id ?? "Sin asignar"}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {!editando ? (
        <button
          className="btn btn-outline-primary"
          onClick={() => setEditando(true)}
        >
          ✏️ Editar mis datos
        </button>
      ) : (
        <form onSubmit={guardarCambios} className="card p-4 shadow-sm">
          <h5 className="mb-3">Actualizar datos</h5>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <label className="form-label">
              Nueva contraseña{" "}
              <small className="text-muted">(dejar vacío para no cambiar)</small>
            </label>
            <input
              type="password"
              className="form-control"
              value={password}
              onChange={e => setPassword(e.target.value)}
            />
          </div>
          <div className="d-flex gap-2">
            <button type="submit" className="btn btn-success">
              💾 Guardar
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => { setEditando(false); setPassword(""); setError(""); }}
            >
              Cancelar
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
