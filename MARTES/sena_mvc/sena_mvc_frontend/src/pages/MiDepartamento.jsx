import { useState, useEffect } from "react";
import { getMe } from "../api/users";
import { getDepartment } from "../api/departments";

export default function MiDepartamento() {
  const [departamento, setDepartamento] = useState(null);
  const [error, setError]               = useState("");
  const [cargando, setCargando]         = useState(true);

  useEffect(() => {
    cargarDepartamento();
  }, []);

  async function cargarDepartamento() {
    try {
      // 1. Obtener perfil del usuario autenticado
      const resPerfil = await getMe();
      const { departamento_id } = resPerfil.data;

      if (!departamento_id) {
        setError("No tienes un departamento asignado. Contacta al administrador.");
        setCargando(false);
        return;
      }

      // 2. Obtener los datos del departamento con ese id
      //    getDepartment() trae todos; filtramos por id
      const resDeps = await getDepartment();
      const dep = resDeps.data.find(d => d.id === departamento_id);

      if (!dep) {
        setError("No se encontró información del departamento.");
      } else {
        setDepartamento(dep);
      }
    } catch (e) {
      setError("Error al cargar el departamento.");
    } finally {
      setCargando(false);
    }
  }

  if (cargando)    return <p className="p-4">Cargando departamento...</p>;
  if (error)       return <p className="p-4 text-danger">{error}</p>;
  if (!departamento) return null;

  return (
    <div className="container py-4" style={{ maxWidth: 600 }}>
      <h2 className="mb-4">🏢 Mi Departamento</h2>
      <div className="card shadow-sm">
        <div className="card-header bg-success text-white">
          <strong>{departamento.nombre}</strong>
        </div>
        <div className="card-body">
          <table className="table table-borderless mb-0">
            <tbody>
              <tr>
                <th style={{ width: "40%" }}>ID</th>
                <td>{departamento.id}</td>
              </tr>
              <tr>
                <th>Nombre</th>
                <td>{departamento.nombre}</td>
              </tr>
              {departamento.descripcion && (
                <tr>
                  <th>Descripción</th>
                  <td>{departamento.descripcion}</td>
                </tr>
              )}
              {departamento.direccion && (
                <tr>
                  <th>Dirección</th>
                  <td>{departamento.direccion.nombre}</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      <p className="text-muted mt-3 small">
        Esta es una vista de solo lectura. Para modificar tu departamento,
        contacta al administrador del sistema.
      </p>
    </div>
  );
}
