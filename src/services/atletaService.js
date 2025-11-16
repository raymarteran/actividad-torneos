// import api from './api';

export const atletaService = {
  // Ejemplo de respuesta del backend - simula la estructura que devolvería el API
  getAll: async () => {
    // Simulamos un delay como si fuera una llamada real al backend
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          nombre: 'Juan Pérez',
          apellido: 'García',
          fechaNacimiento: '2000-05-15',
          genero: 'Masculino',
          nacionalidad: 'México',
          club: 'Club Acuático Nacional',
          email: 'juan.perez@email.com',
          telefono: '+52 55 1234 5678',
          especialidad: 'Estilo libre',
          mejorTiempo: '00:52:30',
          categoria: 'Libre'
        },
        {
          id: 2,
          nombre: 'María González',
          apellido: 'López',
          fechaNacimiento: '2002-08-22',
          genero: 'Femenino',
          nacionalidad: 'México',
          club: 'Club Deportivo del Valle',
          email: 'maria.gonzalez@email.com',
          telefono: '+52 55 9876 5432',
          especialidad: 'Mariposa',
          mejorTiempo: '01:02:15',
          categoria: 'Sub-18'
        },
        {
          id: 3,
          nombre: 'Carlos Ramírez',
          apellido: 'Martínez',
          fechaNacimiento: '1998-03-10',
          genero: 'Masculino',
          nacionalidad: 'México',
          club: 'Academia de Natación Elite',
          email: 'carlos.ramirez@email.com',
          telefono: '+52 55 5555 1234',
          especialidad: 'Espalda',
          mejorTiempo: '00:58:45',
          categoria: 'Libre'
        }
      ]
    };
  },
  // Ejemplo de respuesta del backend para getById - simula la estructura que devolvería el API
  getById: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const atletasEjemplo = {
      1: {
        id: 1,
        nombre: 'Juan Pérez',
        apellido: 'García',
        fechaNacimiento: '2000-05-15',
        genero: 'Masculino',
        nacionalidad: 'México',
        club: 'Club Acuático Nacional',
        email: 'juan.perez@email.com',
        telefono: '+52 55 1234 5678',
        especialidad: 'Estilo libre',
        mejorTiempo: '00:52:30',
        categoria: 'Libre',
        historialCompetencias: [
          { torneo: 'Torneo Nacional 2023', posicion: 2, tiempo: '00:52:45' },
          { torneo: 'Copa Regional 2023', posicion: 1, tiempo: '00:52:30' }
        ]
      },
      2: {
        id: 2,
        nombre: 'María González',
        apellido: 'López',
        fechaNacimiento: '2002-08-22',
        genero: 'Femenino',
        nacionalidad: 'México',
        club: 'Club Deportivo del Valle',
        email: 'maria.gonzalez@email.com',
        telefono: '+52 55 9876 5432',
        especialidad: 'Mariposa',
        mejorTiempo: '01:02:15',
        categoria: 'Sub-18',
        historialCompetencias: [
          { torneo: 'Torneo Juvenil 2023', posicion: 1, tiempo: '01:02:15' }
        ]
      }
    };

    const atleta = atletasEjemplo[parseInt(id)];
    
    if (!atleta) {
      throw new Error('Atleta no encontrado');
    }

    return {
      data: atleta
    };
  },
  // Ejemplo de respuesta del backend para create - simula la estructura que devolvería el API
  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: Math.floor(Math.random() * 1000),
        ...data,
        createdAt: new Date().toISOString()
      }
    };
  },
  // Ejemplo de respuesta del backend para update - simula la estructura que devolvería el API
  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: parseInt(id),
        ...data,
        updatedAt: new Date().toISOString()
      }
    };
  },
  // Ejemplo de respuesta del backend para delete - simula la estructura que devolvería el API
  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: { message: 'Atleta eliminado exitosamente', id: parseInt(id) }
    };
  },
  // Ejemplo de respuesta del backend para inscribir - simula la estructura que devolvería el API
  inscribir: async (torneoId, categoriaId, atletaData) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        id: Math.floor(Math.random() * 1000),
        torneoId: parseInt(torneoId),
        categoriaId: parseInt(categoriaId),
        atletaId: atletaData.atletaId || atletaData.id,
        numeroCompetidor: `COMP-${Math.floor(Math.random() * 10000)}`,
        fechaInscripcion: new Date().toISOString(),
        estado: 'Confirmada',
        ...atletaData
      }
    };
  },
  // Ejemplo de respuesta del backend para getInscripciones - simula la estructura que devolvería el API
  getInscripciones: async (torneoId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          torneoId: parseInt(torneoId),
          categoriaId: 1,
          atleta: {
            id: 1,
            nombre: 'Juan Pérez',
            apellido: 'García',
            club: 'Club Acuático Nacional'
          },
          numeroCompetidor: 'COMP-1234',
          fechaInscripcion: '2024-05-01T10:00:00Z',
          estado: 'Confirmada'
        },
        {
          id: 2,
          torneoId: parseInt(torneoId),
          categoriaId: 1,
          atleta: {
            id: 2,
            nombre: 'María González',
            apellido: 'López',
            club: 'Club Deportivo del Valle'
          },
          numeroCompetidor: 'COMP-1235',
          fechaInscripcion: '2024-05-02T14:30:00Z',
          estado: 'Confirmada'
        }
      ]
    };
  },
  // Ejemplo de respuesta del backend para getInscripcionesByCategoria - simula la estructura que devolvería el API
  getInscripcionesByCategoria: async (torneoId, categoriaId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          torneoId: parseInt(torneoId),
          categoriaId: parseInt(categoriaId),
          atleta: {
            id: 1,
            nombre: 'Juan Pérez',
            apellido: 'García',
            club: 'Club Acuático Nacional',
            especialidad: 'Estilo libre'
          },
          numeroCompetidor: 'COMP-1234',
          fechaInscripcion: '2024-05-01T10:00:00Z',
          estado: 'Confirmada',
          eventos: ['100m libre', '200m libre']
        },
        {
          id: 2,
          torneoId: parseInt(torneoId),
          categoriaId: parseInt(categoriaId),
          atleta: {
            id: 2,
            nombre: 'María González',
            apellido: 'López',
            club: 'Club Deportivo del Valle',
            especialidad: 'Mariposa'
          },
          numeroCompetidor: 'COMP-1235',
          fechaInscripcion: '2024-05-02T14:30:00Z',
          estado: 'Confirmada',
          eventos: ['100m mariposa', '200m mariposa']
        }
      ]
    };
  },
  // getAll: () => api.get('/atletas'),
  // getById: (id) => api.get(`/atletas/${id}`),
  // create: (data) => api.post('/atletas', data),
  // update: (id, data) => api.put(`/atletas/${id}`, data),
  // delete: (id) => api.delete(`/atletas/${id}`),
  // inscribir: (torneoId, categoriaId, atletaData) => 
  //   api.post(`/torneos/${torneoId}/categorias/${categoriaId}/inscripciones`, atletaData),
  // getInscripciones: (torneoId) => api.get(`/torneos/${torneoId}/inscripciones`),
  // getInscripcionesByCategoria: (torneoId, categoriaId) => 
  //   api.get(`/torneos/${torneoId}/categorias/${categoriaId}/inscripciones`),
};

