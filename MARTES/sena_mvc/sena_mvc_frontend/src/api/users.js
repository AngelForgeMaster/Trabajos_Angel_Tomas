import api from "./client";

export const getUers      = ()         => api.get("/usuarios/");
export const creatUsers   = (data)     => api.post("/usuarios/", data);
export const updateUsers  = (id, data) => api.put(`/usuarios/${id}`, data);
export const deleteUsers  = (id)       => api.delete(`/usuarios/${id}`);

// ── Nuevo en Clase 4 ───────────────────────────────────────────────
export const getMe        = ()         => api.get("/usuarios/me");
export const getUsuario   = (id)       => api.get(`/usuarios/${id}`);

