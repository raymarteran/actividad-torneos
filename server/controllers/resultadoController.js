import Resultado from '../models/Resultado.js';
import Tiempo from '../models/Tiempo.js';
import Torneo from '../models/Torneo.js';
import Categoria from '../models/Categoria.js';

// Función para convertir tiempo a segundos
const tiempoASegundos = (tiempo) => {
  if (!tiempo) return Infinity;
  const partes = tiempo.split(':');
  if (partes.length === 2) {
    return parseInt(partes[0]) * 60 + parseFloat(partes[1]);
  } else if (partes.length === 3) {
    return parseInt(partes[0]) * 3600 + parseInt(partes[1]) * 60 + parseFloat(partes[2]);
  }
  return parseFloat(tiempo);
};

// Función para formatear segundos a tiempo
const segundosATiempo = (segundos) => {
  if (segundos === Infinity) return null;
  const horas = Math.floor(segundos / 3600);
  const minutos = Math.floor((segundos % 3600) / 60);
  const segs = (segundos % 60).toFixed(2);
  if (horas > 0) {
    return `${String(horas).padStart(2, '0')}:${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
  }
  return `${String(minutos).padStart(2, '0')}:${String(segs).padStart(2, '0')}`;
};

// @desc    Obtener resultados de un torneo
// @route   GET /api/torneos/:id/resultados
// @access  Private
export const getResultados = async (req, res, next) => {
  try {
    const torneo = await Torneo.findById(req.params.id);
    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const categorias = await Categoria.find({ torneo_id: req.params.id });
    const resultados = await Resultado.find({ torneo_id: req.params.id })
      .populate('atleta_id', 'nombre apellido club')
      .populate('categoria_id', 'nombre genero')
      .populate('inscripcion_id', 'numero_competidor')
      .sort({ categoria_id: 1, posicion_final: 1 });

    // Agrupar por categoría
    const resultadosPorCategoria = categorias.map(categoria => ({
      categoriaId: categoria._id,
      nombre: categoria.nombre,
      resultados: resultados.filter(r => r.categoria_id._id.toString() === categoria._id.toString()),
    }));

    res.json({
      torneoId: torneo._id,
      torneo: {
        id: torneo._id,
        nombre: torneo.nombre,
        fecha: torneo.fecha,
      },
      categorias: resultadosPorCategoria,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener resultados por categoría
// @route   GET /api/torneos/:id/categorias/:categoriaId/resultados
// @access  Private
export const getResultadosByCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findById(req.params.categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Obtener todos los tiempos de la categoría
    const tiempos = await Tiempo.find({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
      estado: 'confirmado',
    })
      .populate('atleta_id', 'nombre apellido club')
      .populate('evento_id', 'nombre distancia estilo')
      .populate('inscripcion_id', 'numero_competidor');

    // Agrupar tiempos por atleta
    const tiemposPorAtleta = {};
    tiempos.forEach(tiempo => {
      const atletaId = tiempo.atleta_id._id.toString();
      if (!tiemposPorAtleta[atletaId]) {
        tiemposPorAtleta[atletaId] = {
          atleta: tiempo.atleta_id,
          inscripcion: tiempo.inscripcion_id,
          tiempos: [],
          puntosTotales: 0,
        };
      }
      tiemposPorAtleta[atletaId].tiempos.push({
        evento: tiempo.evento_id.nombre,
        tiempo: tiempo.tiempo,
        posicion: tiempo.posicion,
        puntos: tiempo.puntos,
      });
      tiemposPorAtleta[atletaId].puntosTotales += tiempo.puntos || 0;
    });

    // Calcular mejor tiempo y ordenar
    const resultados = Object.values(tiemposPorAtleta).map(item => {
      const mejorTiempo = item.tiempos.reduce((mejor, t) => {
        const tiempoSegundos = tiempoASegundos(t.tiempo);
        const mejorSegundos = tiempoASegundos(mejor);
        return tiempoSegundos < mejorSegundos ? t.tiempo : mejor;
      }, item.tiempos[0]?.tiempo || null);

      return {
        atleta: item.atleta,
        inscripcion: item.inscripcion,
        puntosTotales: item.puntosTotales,
        mejorTiempo,
        cantidadEventos: item.tiempos.length,
        tiempos: item.tiempos,
      };
    });

    // Ordenar por puntos totales (mayor a menor)
    resultados.sort((a, b) => b.puntosTotales - a.puntosTotales);

    // Asignar posiciones
    resultados.forEach((resultado, index) => {
      resultado.posicion = index + 1;
    });

    res.json({
      torneoId: req.params.id,
      categoriaId: req.params.categoriaId,
      categoria: {
        id: categoria._id,
        nombre: categoria.nombre,
        descripcion: categoria.descripcion,
      },
      resultados,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Generar clasificación final
// @route   POST /api/torneos/:id/categorias/:categoriaId/clasificacion
// @access  Private
export const generarClasificacion = async (req, res, next) => {
  try {
    const categoria = await Categoria.findById(req.params.categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Obtener todos los tiempos confirmados de la categoría
    const tiempos = await Tiempo.find({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
      estado: 'confirmado',
    })
      .populate('atleta_id', 'nombre apellido club')
      .populate('evento_id', 'nombre distancia estilo')
      .populate('inscripcion_id', 'numero_competidor');

    // Agrupar tiempos por atleta
    const tiemposPorAtleta = {};
    tiempos.forEach(tiempo => {
      const atletaId = tiempo.atleta_id._id.toString();
      if (!tiemposPorAtleta[atletaId]) {
        tiemposPorAtleta[atletaId] = {
          atleta: tiempo.atleta_id,
          inscripcion: tiempo.inscripcion_id,
          tiempos: [],
          puntosTotales: 0,
        };
      }
      tiemposPorAtleta[atletaId].tiempos.push({
        evento: tiempo.evento_id.nombre,
        tiempo: tiempo.tiempo,
        posicion: tiempo.posicion,
        puntos: tiempo.puntos,
      });
      tiemposPorAtleta[atletaId].puntosTotales += tiempo.puntos || 0;
    });

    // Calcular mejor tiempo y crear resultados
    const clasificacion = Object.values(tiemposPorAtleta).map(item => {
      const mejorTiempo = item.tiempos.reduce((mejor, t) => {
        const tiempoSegundos = tiempoASegundos(t.tiempo);
        const mejorSegundos = tiempoASegundos(mejor);
        return tiempoSegundos < mejorSegundos ? t.tiempo : mejor;
      }, item.tiempos[0]?.tiempo || null);

      return {
        atleta: item.atleta,
        inscripcion: item.inscripcion,
        puntosTotales: item.puntosTotales,
        mejorTiempo,
        cantidadEventos: item.tiempos.length,
        tiempos: item.tiempos,
      };
    });

    // Ordenar por puntos totales (mayor a menor)
    clasificacion.sort((a, b) => b.puntosTotales - a.puntosTotales);

    // Eliminar resultados anteriores de esta categoría
    await Resultado.deleteMany({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
    });

    // Crear nuevos resultados
    const resultadosCreados = await Promise.all(
      clasificacion.map((item, index) =>
        Resultado.create({
          torneo_id: req.params.id,
          categoria_id: req.params.categoriaId,
          atleta_id: item.atleta._id,
          inscripcion_id: item.inscripcion._id,
          posicion_final: index + 1,
          puntos_totales: item.puntosTotales,
          mejor_tiempo: item.mejorTiempo,
          cantidad_eventos: item.cantidadEventos,
        })
      )
    );

    // Obtener eventos únicos
    const eventos = [...new Set(tiempos.map(t => t.evento_id.nombre))];

    res.json({
      torneoId: req.params.id,
      categoriaId: req.params.categoriaId,
      fechaGeneracion: new Date(),
      clasificacion: clasificacion.map((item, index) => ({
        posicion: index + 1,
        atleta: item.atleta,
        inscripcion: item.inscripcion,
        puntosTotales: item.puntosTotales,
        mejorTiempo: item.mejorTiempo,
        cantidadEventos: item.cantidadEventos,
        tiempos: item.tiempos,
      })),
      totalParticipantes: clasificacion.length,
      eventosIncluidos: eventos,
    });
  } catch (error) {
    next(error);
  }
};

