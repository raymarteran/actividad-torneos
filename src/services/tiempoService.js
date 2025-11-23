import api from './api';

export const tiempoService = {
  registrar: (torneoId, categoriaId, tiempoData) => 
    api.post(`/torneos/${torneoId}/categorias/${categoriaId}/tiempos`, tiempoData),
  update: (torneoId, categoriaId, tiempoId, tiempoData) => 
    api.put(`/torneos/${torneoId}/categorias/${categoriaId}/tiempos/${tiempoId}`, tiempoData),
  delete: (torneoId, categoriaId, tiempoId) => 
    api.delete(`/torneos/${torneoId}/categorias/${categoriaId}/tiempos/${tiempoId}`),
  getByCategoria: (torneoId, categoriaId) => 
    api.get(`/torneos/${torneoId}/categorias/${categoriaId}/tiempos`),
};

