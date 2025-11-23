import api from './api';

export const atletaService = {
  getAll: () => api.get('/atletas'),
  getById: (id) => api.get(`/atletas/${id}`),
  create: (data) => api.post('/atletas', data),
  update: (id, data) => api.put(`/atletas/${id}`, data),
  delete: (id) => api.delete(`/atletas/${id}`),
  inscribir: (torneoId, categoriaId, atletaData) => 
    api.post(`/inscritorneos/${torneoId}/categorias/${categoriaId}/inscripciones`, atletaData),
  getInscripciones: (torneoId) => api.get(`/inscritorneos/${torneoId}/inscripciones`),
  getInscripcionesByCategoria: (torneoId, categoriaId) => 
    api.get(`/inscritorneos/${torneoId}/categorias/${categoriaId}/inscripciones`),
};

