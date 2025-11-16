// import api from './api';

export const resultadoService = {
  // Ejemplo de respuesta del backend para getResultados - simula la estructura que devolvería el API
  getResultados: async (torneoId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        torneoId: parseInt(torneoId),
        torneo: {
          id: parseInt(torneoId),
          nombre: 'Torneo Nacional de Natación 2024',
          fecha: '2024-06-15'
        },
        categorias: [
          {
            categoriaId: 1,
            nombre: 'Libre',
            resultados: [
              {
                id: 1,
                atletaId: 1,
                atleta: {
                  id: 1,
                  nombre: 'Juan Pérez',
                  apellido: 'García',
                  club: 'Club Acuático Nacional'
                },
                evento: '100m libre',
                tiempo: '00:52:30',
                posicion: 1,
                puntos: 100
              },
              {
                id: 2,
                atletaId: 2,
                atleta: {
                  id: 2,
                  nombre: 'Carlos Ramírez',
                  apellido: 'Martínez',
                  club: 'Academia de Natación Elite'
                },
                evento: '100m libre',
                tiempo: '00:53:15',
                posicion: 2,
                puntos: 80
              }
            ]
          },
          {
            categoriaId: 2,
            nombre: 'Sub-18',
            resultados: [
              {
                id: 3,
                atletaId: 3,
                atleta: {
                  id: 3,
                  nombre: 'María González',
                  apellido: 'López',
                  club: 'Club Deportivo del Valle'
                },
                evento: '100m mariposa',
                tiempo: '01:02:15',
                posicion: 1,
                puntos: 100
              }
            ]
          }
        ]
      }
    };
  },
  // Ejemplo de respuesta del backend para getResultadosByCategoria - simula la estructura que devolvería el API
  getResultadosByCategoria: async (torneoId, categoriaId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        torneoId: parseInt(torneoId),
        categoriaId: parseInt(categoriaId),
        categoria: {
          id: parseInt(categoriaId),
          nombre: 'Libre',
          descripcion: 'Categoría libre para todas las edades'
        },
        resultados: [
          {
            id: 1,
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
            fechaRegistro: '2024-06-15T10:30:00Z'
          },
          {
            id: 2,
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
            fechaRegistro: '2024-06-15T10:32:00Z'
          },
          {
            id: 3,
            atletaId: 3,
            atleta: {
              id: 3,
              nombre: 'Pedro Sánchez',
              apellido: 'Hernández',
              club: 'Club Deportivo Central',
              numeroCompetidor: 'COMP-1236'
            },
            evento: '100m libre',
            tiempo: '00:54:20',
            posicion: 3,
            puntos: 60,
            fechaRegistro: '2024-06-15T10:35:00Z'
          }
        ],
        clasificacionGeneral: [
          { posicion: 1, atletaId: 1, puntosTotales: 100 },
          { posicion: 2, atletaId: 2, puntosTotales: 80 },
          { posicion: 3, atletaId: 3, puntosTotales: 60 }
        ]
      }
    };
  },
  // Ejemplo de respuesta del backend para generarClasificacion - simula la estructura que devolvería el API
  generarClasificacion: async (torneoId, categoriaId) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      data: {
        torneoId: parseInt(torneoId),
        categoriaId: parseInt(categoriaId),
        fechaGeneracion: new Date().toISOString(),
        clasificacion: [
          {
            posicion: 1,
            atleta: {
              id: 1,
              nombre: 'Juan Pérez',
              apellido: 'García',
              club: 'Club Acuático Nacional',
              numeroCompetidor: 'COMP-1234'
            },
            puntosTotales: 250,
            eventos: [
              { evento: '100m libre', tiempo: '00:52:30', puntos: 100 },
              { evento: '200m libre', tiempo: '01:50:15', puntos: 100 },
              { evento: '400m libre', tiempo: '03:55:20', puntos: 50 }
            ],
            mejorTiempo: '00:52:30'
          },
          {
            posicion: 2,
            atleta: {
              id: 2,
              nombre: 'Carlos Ramírez',
              apellido: 'Martínez',
              club: 'Academia de Natación Elite',
              numeroCompetidor: 'COMP-1235'
            },
            puntosTotales: 200,
            eventos: [
              { evento: '100m libre', tiempo: '00:53:15', puntos: 80 },
              { evento: '200m libre', tiempo: '01:52:30', puntos: 80 },
              { evento: '400m libre', tiempo: '04:00:10', puntos: 40 }
            ],
            mejorTiempo: '00:53:15'
          },
          {
            posicion: 3,
            atleta: {
              id: 3,
              nombre: 'Pedro Sánchez',
              apellido: 'Hernández',
              club: 'Club Deportivo Central',
              numeroCompetidor: 'COMP-1236'
            },
            puntosTotales: 150,
            eventos: [
              { evento: '100m libre', tiempo: '00:54:20', puntos: 60 },
              { evento: '200m libre', tiempo: '01:55:45', puntos: 60 },
              { evento: '400m libre', tiempo: '04:05:30', puntos: 30 }
            ],
            mejorTiempo: '00:54:20'
          }
        ],
        totalParticipantes: 3,
        eventosIncluidos: ['100m libre', '200m libre', '400m libre']
      }
    };
  },
  // getResultados: (torneoId) => api.get(`/torneos/${torneoId}/resultados`),
  // getResultadosByCategoria: (torneoId, categoriaId) => 
  //   api.get(`/torneos/${torneoId}/categorias/${categoriaId}/resultados`),
  // generarClasificacion: (torneoId, categoriaId) => 
  //   api.post(`/torneos/${torneoId}/categorias/${categoriaId}/clasificacion`),
};

