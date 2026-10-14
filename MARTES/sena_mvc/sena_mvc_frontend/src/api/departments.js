import api from "./client";

export const getDepartment      = ()         => api.get("/departamentos/");
export const creatDepartment    = (data)     => api.post("/departamentos/", data);
export const updateDepartment   = (id, data) => api.put(`/departamentos/${id}`, data);
export const deleteDepartment   = (id)       => api.delete(`/departamentos/${id}`);
