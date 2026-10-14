import { useState, useEffect, useMemo } from "react";
import { getUers } from "../api/users";
import { getProyectos, getMisProyectos } from "../api/projects";
import { getDepartment } from "../api/departments";
import StatCard from "../components/charts/StatCard";
import BarChart from "../components/charts/BarChart";
import DonutChart from "../components/charts/DonutChart";

const COLOR_PRIMARIO   = "#2a78d6";
const COLOR_SECUNDARIO = "#eb6834";

export default function Dashboard() {
  const token   = localStorage.getItem("token");
  const payload = token ? JSON.parse(atob(token.split(".")[1])) : {};
  const esAdmin = payload.rol === "admin";

  return esAdmin ? <DashboardAdmin /> : <DashboardUsuario />;
}

// ─────────────────────────────────────────────────────────────────
// Dashboard del administrador: usuarios, proyectos y departamentos
// ─────────────────────────────────────────────────────────────────
function DashboardAdmin() {
  const [usuarios,     setUsuarios]     = useState([]);
  const [proyectos,    setProyectos]    = useState([]);
  const [departamentos, setDepartamentos] = useState([]);
  const [error,        setError]        = useState("");
  const [cargando,     setCargando]     = useState(true);

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const [resUsuarios, resProyectos, resDeptos] = await Promise.all([
        getUers(),
        getProyectos(),
        getDepartment()
      ]);
      setUsuarios(resUsuarios.data);
      setProyectos(resProyectos.data);
      setDepartamentos(resDeptos.data);
    } catch (e) {
      setError("No se pudieron cargar las estadísticas.");
    } finally {
      setCargando(false);
    }
  }

  const porRol = useMemo(() => {
    const admins = usuarios.filter(u => u.rol === "admin").length;
    const users  = usuarios.length - admins;
    return [
      { label: "Administradores", value: admins, color: COLOR_SECUNDARIO },
      { label: "Usuarios",        value: users,  color: COLOR_PRIMARIO }
    ];
  }, [usuarios]);

  const usuariosPorDepartamento = useMemo(() => {
    const conteo = new Map();
    for (const u of usuarios) {
      const nombre = u.departamento?.nombre || "Sin departamento";
      conteo.set(nombre, (conteo.get(nombre) || 0) + 1);
    }
    return [...conteo.entries()]
      .map(([label, value]) => ({ label, value }))
      .sort((a, b) => b.value - a.value);
  }, [usuarios]);

  const empleadosPorProyecto = useMemo(() => {
    const conteo = new Map();
    for (const p of proyectos) conteo.set(p.id, { label: p.nombre, value: 0 });
    for (const u of usuarios) {
      for (const p of (u.proyectos || [])) {
        const actual = conteo.get(p.id);
        if (actual) actual.value += 1;
      }
    }
    return [...conteo.values()].sort((a, b) => b.value - a.value);
  }, [usuarios, proyectos]);

  if (cargando) return <p className="p-4">Cargando estadísticas...</p>;

  return (
    <div className="container-fluid py-3">
      <h2 className="mb-4">📊 Dashboard - Administrador</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3 mb-4">
        <StatCard label="Usuarios"      value={usuarios.length}      icon="👥" color="primary" />
        <StatCard label="Proyectos"     value={proyectos.length}     icon="📋" color="success" />
        <StatCard label="Departamentos" value={departamentos.length} icon="🏢" color="warning" />
        <StatCard
          label="Promedio empleados/proyecto"
          value={proyectos.length ? (empleadosPorProyecto.reduce((s, p) => s + p.value, 0) / proyectos.length).toFixed(1) : 0}
          icon="📈"
          color="info"
        />
      </div>

      <div className="row g-3">
        <div className="col-12 col-lg-5">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Usuarios por rol</h5>
              <DonutChart data={porRol} />
            </div>
          </div>
        </div>

        <div className="col-12 col-lg-7">
          <div className="card shadow-sm h-100">
            <div className="card-body">
              <h5 className="card-title">Usuarios por departamento</h5>
              <BarChart data={usuariosPorDepartamento} color={COLOR_PRIMARIO} />
            </div>
          </div>
        </div>

        <div className="col-12">
          <div className="card shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Empleados asignados por proyecto</h5>
              <BarChart data={empleadosPorProyecto} color={COLOR_SECUNDARIO} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// Dashboard del usuario: estadísticas de sus propios proyectos
// ─────────────────────────────────────────────────────────────────
function DashboardUsuario() {
  const [proyectos, setProyectos] = useState([]);
  const [error,     setError]     = useState("");
  const [cargando,  setCargando]  = useState(true);

  const token     = localStorage.getItem("token");
  const payload   = token ? JSON.parse(atob(token.split(".")[1])) : {};

  useEffect(() => {
    cargarDatos();
  }, []);

  async function cargarDatos() {
    try {
      const res = await getMisProyectos();
      setProyectos(res.data);
    } catch (e) {
      setError("No se pudieron cargar tus estadísticas.");
    } finally {
      setCargando(false);
    }
  }

  const companerosPorProyecto = useMemo(() => {
    return proyectos
      .map(p => ({ label: p.nombre, value: (p.empleados || []).length }))
      .sort((a, b) => b.value - a.value);
  }, [proyectos]);

  const companerosUnicos = useMemo(() => {
    const ids = new Set();
    for (const p of proyectos) {
      for (const e of (p.empleados || [])) {
        if (e.email !== payload.sub) ids.add(e.id);
      }
    }
    return ids.size;
  }, [proyectos, payload.sub]);

  if (cargando) return <p className="p-4">Cargando estadísticas...</p>;

  return (
    <div className="container-fluid py-3">
      <h2 className="mb-4">📊 Mi Dashboard</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="row g-3 mb-4">
        <StatCard label="Mis proyectos"  value={proyectos.length}    icon="📋" color="primary" />
        <StatCard label="Compañeros"     value={companerosUnicos}    icon="🤝" color="success" />
      </div>

      {proyectos.length === 0 ? (
        <div className="alert alert-info">
          No estás asignado a ningún proyecto todavía. Contacta al administrador
          para que te agregue a un proyecto.
        </div>
      ) : (
        <div className="card shadow-sm">
          <div className="card-body">
            <h5 className="card-title">Compañeros por proyecto</h5>
            <BarChart data={companerosPorProyecto} color={COLOR_PRIMARIO} />
          </div>
        </div>
      )}
    </div>
  );
}
