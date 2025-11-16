// import api from './api';

export const tiempoService = {
  // Ejemplo de respuesta del backend para registrar - simula la estructura que devolvería el API
  registrar: async (torneoId, categoriaId, tiempoData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: Math.floor(Math.random() * 1000),
        torneoId: parseInt(torneoId),
        categoriaId: parseInt(categoriaId),
        atletaId: tiempoData.atletaId,
        evento: tiempoData.evento || '100m libre',
        tiempo: tiempoData.tiempo,
        posicion: tiempoData.posicion || null,
        puntos: tiempoData.puntos || null,
        fechaRegistro: new Date().toISOString(),
        registradoPor: tiempoData.registradoPor || 'Sistema',
        estado: 'Confirmado',
        observaciones: tiempoData.observaciones || null
      }
    };
  },
  // Ejemplo de respuesta del backend para update - simula la estructura que devolvería el API
  update: async (torneoId, categoriaId, tiempoId, tiempoData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: parseInt(tiempoId),
        torneoId: parseInt(torneoId),
        categoriaId: parseInt(categoriaId),
        atletaId: tiempoData.atletaId,
        evento: tiempoData.evento,
        tiempo: tiempoData.tiempo,
        posicion: tiempoData.posicion,
        puntos: tiempoData.puntos,
        fechaRegistro: '2024-06-15T10:30:00Z',
        fechaActualizacion: new Date().toISOString(),
        registradoPor: tiempoData.registradoPor || 'Sistema',
        estado: 'Actualizado',
        observaciones: tiempoData.observaciones || null
      }
    };
  },
  // Ejemplo de respuesta del backend para delete - simula la estructura que devolvería el API
  delete: async (torneoId, categoriaId, tiempoId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        message: 'Tiempo eliminado exitosamente',
        id: parseInt(tiempoId),
        torneoId: parseInt(torneoId),
        categoriaId: parseInt(categoriaId)
      }
    };
  },
  // Ejemplo de respuesta del backend para getByCategoria - simula la estructura que devolvería el API
  getByCategoria: async (torneoId, categoriaId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          torneoId: parseInt(torneoId),
          categoriaId: parseInt(categoriaId),
          atletaId: 1,
          atleta: {
            id: 1,
            nombre: 'Juan Pérez',
            apellido: 'García',
            club: 'Club Acuático Nacional',
            numeroCompetidor: 'COMP-1234'
          },
          evento: '100m libre',
          tiempo: '00:52:30',
          posicion: 1,
          puntos: 100,
          fechaRegistro: '2024-06-15T10:30:00Z',
          registradoPor: 'Juez Principal',
          estado: 'Confirmado',
          observaciones: null
        },
        {
          id: 2,
          torneoId: parseInt(torneoId),
          categoriaId: parseInt(categoriaId),
          atletaId: 2,
          atleta: {
            id: 2,
            nombre: 'Carlos Ramírez',
            apellido: 'Martínez',
            club: 'Academia de Natación Elite',
            numeroCompetidor: 'COMP-1235'
          },
          evento: '100m libre',
          tiempo: '00:53:15',
          posicion: 2,
          puntos: 80,
          fechaRegistro: '2024-06-15T10:32:00Z',
          registradoPor: 'Juez Principal',
          estado: 'Confirmado',
          observaciones: null
        },
        {
          id: 3,
          torneoId: parseInt(torneoId),
          categoriaId: parseInt(categoriaId),
          atletaId: 3,
          atleta: {
            id: 3,
            nombre: 'Pedro Sánchez',
            apellido: 'Hernández',
            club: 'Club Deportivo Central',
            numeroCompetidor: 'COMP-1236'
          },
          evento: '200m libre',
          tiempo: '01:55:45',
          posicion: 1,
          puntos: 100,
          fechaRegistro: '2024-06-15T11:00:00Z',
          registradoPor: 'Juez Secundario',
          estado: 'Confirmado',
          observaciones: 'Tiempo personal mejorado'
        },
        {
          id: 4,
          torneoId: parseInt(torneoId),
          categoriaId: parseInt(categoriaId),
          atletaId: 1,
          atleta: {
            id: 1,
            nombre: 'Juan Pérez',
            apellido: 'García',
            club: 'Club Acuático Nacional',
            numeroCompetidor: 'COMP-1234'
          },
          evento: '200m libre',
          tiempo: '01:50:15',
          posicion: 2,
          puntos: 80,
          fechaRegistro: '2024-06-15T11:02:00Z',
          registradoPor: 'Juez Secundario',
          estado: 'Confirmado',
          observaciones: null
        }
      ]
    };
  },
  // registrar: (torneoId, categoriaId, tiempoData) => 
  //   api.post(`/torneos/${torneoId}/categorias/${categoriaId}/tiempos`, tiempoData),
  // update: (torneoId, categoriaId, tiempoId, tiempoData) => 
  //   api.put(`/torneos/${torneoId}/categorias/${categoriaId}/tiempos/${tiempoId}`, tiempoData),
  // delete: (torneoId, categoriaId, tiempoId) => 
  //   api.delete(`/torneos/${torneoId}/categorias/${categoriaId}/tiempos/${tiempoId}`),
  // getByCategoria: (torneoId, categoriaId) => 
  //   api.get(`/torneos/${torneoId}/categorias/${categoriaId}/tiempos`),
};

