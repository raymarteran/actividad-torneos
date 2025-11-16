// import api from './api';

export const torneoService = {
  // Ejemplo de respuesta del backend - simula la estructura que devolvería el API
  getAll: async () => {
    // Simulamos un delay como si fuera una llamada real al backend
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: [
        {
          id: 1,
          nombre: 'Torneo Nacional de Natación 2024',
          deporte: 'Natación',
          fecha: '2024-06-15',
          ubicacion: 'Centro Acuático Nacional, Ciudad de México',
          descripcion: 'Competencia nacional de natación con múltiples categorías y eventos',
          categorias: ['Sub-18', 'Libre', 'Máster'],
          eventos: ['100m libre', '200m mariposa', '400m combinado']
        },
        {
          id: 2,
          nombre: 'Triatlón Internacional del Pacífico',
          deporte: 'Triatlón',
          fecha: '2024-07-20',
          ubicacion: 'Playa del Carmen, Quintana Roo',
          descripcion: 'Triatlón de distancia olímpica con categorías por edad',
          categorias: ['Elite', 'Age Group', 'Recreativo'],
          eventos: ['1.5km natación', '40km ciclismo', '10km carrera']
        },
        {
          id: 3,
          nombre: 'Copa Regional de Natación Artística',
          deporte: 'Natación Artística',
          fecha: '2024-08-10',
          ubicacion: 'Complejo Acuático Regional, Guadalajara',
          descripcion: 'Competencia regional de natación sincronizada',
          categorias: ['Juvenil', 'Senior'],
          eventos: ['Solo', 'Dúo', 'Equipo']
        }
      ]
    };
  },
  // Ejemplo de respuesta del backend para getById - simula la estructura que devolvería el API
  getById: async (id) => {
    // Simulamos un delay como si fuera una llamada real al backend
    await new Promise(resolve => setTimeout(resolve, 500));
    
    // Datos de ejemplo para diferentes IDs
    const torneosEjemplo = {
      1: {
        id: 1,
        nombre: 'Torneo Nacional de Natación 2024',
        deporte: 'Natación',
        fecha: '2024-06-15',
        ubicacion: 'Centro Acuático Nacional, Ciudad de México',
        descripcion: 'Competencia nacional de natación con múltiples categorías y eventos. Este torneo reúne a los mejores nadadores del país en una competencia de alto nivel.',
        categorias: ['Sub-18', 'Libre', 'Máster'],
        eventos: ['100m libre', '200m mariposa', '400m combinado', 'Relevo 4x100m']
      },
      2: {
        id: 2,
        nombre: 'Triatlón Internacional del Pacífico',
        deporte: 'Triatlón',
        fecha: '2024-07-20',
        ubicacion: 'Playa del Carmen, Quintana Roo',
        descripcion: 'Triatlón de distancia olímpica con categorías por edad. Competencia internacional que atrae participantes de toda América Latina.',
        categorias: ['Elite', 'Age Group', 'Recreativo'],
        eventos: ['1.5km natación', '40km ciclismo', '10km carrera']
      },
      3: {
        id: 3,
        nombre: 'Copa Regional de Natación Artística',
        deporte: 'Natación Artística',
        fecha: '2024-08-10',
        ubicacion: 'Complejo Acuático Regional, Guadalajara',
        descripcion: 'Competencia regional de natación sincronizada. Evento que promueve la natación artística en la región occidental del país.',
        categorias: ['Juvenil', 'Senior'],
        eventos: ['Solo', 'Dúo', 'Equipo', 'Combinado']
      }
    };

    const torneo = torneosEjemplo[parseInt(id)];
    
    if (!torneo) {
      throw new Error('Torneo no encontrado');
    }

    return {
      data: torneo
    };
  },
  // getById: (id) => api.get(`/torneos/${id}`),
  // create: (data) => api.post('/torneos', data),
  // update: (id, data) => api.put(`/torneos/${id}`, data),
  // delete: (id) => api.delete(`/torneos/${id}`),
  // getCategorias: (torneoId) => api.get(`/torneos/${torneoId}/categorias`),
  // addCategoria: (torneoId, categoria) => api.post(`/torneos/${torneoId}/categorias`, categoria),
  // updateCategoria: (torneoId, categoriaId, categoria) => 
  //   api.put(`/torneos/${torneoId}/categorias/${categoriaId}`, categoria),
  // deleteCategoria: (torneoId, categoriaId) => 
  //   api.delete(`/torneos/${torneoId}/categorias/${categoriaId}`),
};

