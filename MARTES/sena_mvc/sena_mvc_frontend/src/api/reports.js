import api from "./client";

const descargar = (url) => api.get(url, { responseType: "blob" });

export const exportarUsuariosExcel      = () => descargar("/reportes/usuarios");
export const exportarDepartamentosExcel = () => descargar("/reportes/departamentos");
export const exportarDireccionesExcel   = () => descargar("/reportes/direcciones");
export const exportarProyectosExcel     = () => descargar("/reportes/proyectos");
