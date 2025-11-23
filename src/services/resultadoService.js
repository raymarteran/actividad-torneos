import api from './api';

export const resultadoService = {
  getResultados: (torneoId) => api.get(`/torneos/${torneoId}/resultados`),
  getResultadosByCategoria: (torneoId, categoriaId) => 
    api.get(`/torneos/${torneoId}/categorias/${categoriaId}/resultados`),
  generarClasificacion: (torneoId, categoriaId) => 
    api.post(`/torneos/${torneoId}/categorias/${categoriaId}/clasificacion`),
};

