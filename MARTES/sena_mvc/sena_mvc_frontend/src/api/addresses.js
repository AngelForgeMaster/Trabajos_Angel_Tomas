import api from "./client";

export const getDirecciones  = ()         => api.get("/direcciones/");
export const createDireccion = (data)     => api.post("/direcciones/", data);
export const updateDireccion = (id, data) => api.put(`/direcciones/${id}`, data);
export const deleteDireccion = (id)       => api.delete(`/direcciones/${id}`);
