import Tiempo from '../models/Tiempo.js';
import Torneo from '../models/Torneo.js';
import Categoria from '../models/Categoria.js';
import Evento from '../models/Evento.js';
import Inscripcion from '../models/Inscripcion.js';

// Función para calcular puntos según posición
const calcularPuntos = (posicion, totalParticipantes) => {
  if (posicion === 1) return 100;
  if (posicion === 2) return 80;
  if (posicion === 3) return 60;
  if (posicion === 4) return 50;
  if (posicion === 5) return 40;
  if (posicion <= 10) return 30;
  if (posicion <= 20) return 20;
  return 10;
};

// Función para convertir tiempo a segundos para comparación
const tiempoASegundos = (tiempo) => {
  const partes = tiempo.split(':');
  if (partes.length === 2) {
    return parseInt(partes[0]) * 60 + parseFloat(partes[1]);
  } else if (partes.length === 3) {
    return parseInt(partes[0]) * 3600 + parseInt(partes[1]) * 60 + parseFloat(partes[2]);
  }
  return parseFloat(tiempo);
};

// @desc    Obtener tiempos por categoría
// @route   GET /api/torneos/:id/categorias/:categoriaId/tiempos
// @access  Private
export const getTiempos = async (req, res, next) => {
  try {
    const { eventoId } = req.query;

    let query = {
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
    };

    if (eventoId) {
      query.evento_id = eventoId;
    }

    const tiempos = await Tiempo.find(query)
      .populate('atleta_id', 'nombre apellido club numero_competidor')
      .populate('evento_id', 'nombre distancia estilo')
      .populate('inscripcion_id', 'numero_competidor')
      .populate('usuario_registro_id', 'nombre apellido')
      .sort({ posicion: 1, tiempo: 1 });

    res.json(tiempos);
  } catch (error) {
    next(error);
  }
};

// @desc    Registrar tiempo
// @route   POST /api/torneos/:id/categorias/:categoriaId/tiempos
// @access  Private
export const createTiempo = async (req, res, next) => {
  try {
    const { atletaId, eventoId, evento: eventoNombre, tiempo, inscripcionId, observaciones } = req.body;

    // Validar campos requeridos
    if (!atletaId || !tiempo) {
      return res.status(400).json({ error: 'Atleta y tiempo son requeridos' });
    }

    if (!eventoId && !eventoNombre) {
      return res.status(400).json({ error: 'Evento (ID o nombre) es requerido' });
    }

    // Verificar que el torneo existe
    const torneo = await Torneo.findById(req.params.id);
    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    // Verificar que la categoría existe
    const categoria = await Categoria.findById(req.params.categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    // Obtener o crear el evento
    let evento;
    if (eventoId) {
      // Si se proporciona un ID, buscar el evento existente
      evento = await Evento.findById(eventoId);
      if (!evento) {
        return res.status(404).json({ error: 'Evento no encontrado' });
      }
      if (evento.torneo_id.toString() !== req.params.id) {
        return res.status(400).json({ error: 'El evento no pertenece a este torneo' });
      }
    } else if (eventoNombre) {
      // Si se proporciona un nombre, buscar por nombre o crear uno nuevo
      evento = await Evento.findOne({ 
        torneo_id: req.params.id,
        nombre: eventoNombre 
      });
      
      if (!evento) {
        // Crear nuevo evento si no existe
        const eventosExistentes = await Evento.find({ torneo_id: req.params.id });
        evento = await Evento.create({
          torneo_id: req.params.id,
          nombre: eventoNombre,
          orden: eventosExistentes.length,
        });
      }
    }

    // Verificar inscripción
    let inscripcion;
    if (inscripcionId) {
      inscripcion = await Inscripcion.findById(inscripcionId);
      if (!inscripcion) {
        return res.status(404).json({ error: 'Inscripción no encontrada' });
      }
      if (inscripcion.torneo_id.toString() !== req.params.id ||
          inscripcion.categoria_id.toString() !== req.params.categoriaId ||
          inscripcion.atleta_id.toString() !== atletaId) {
        return res.status(400).json({ error: 'La inscripción no coincide con los datos proporcionados' });
      }
    } else {
      // Buscar inscripción automáticamente
      inscripcion = await Inscripcion.findOne({
        torneo_id: req.params.id,
        categoria_id: req.params.categoriaId,
        atleta_id: atletaId,
      });
      if (!inscripcion) {
        return res.status(400).json({ error: 'El atleta no está inscrito en esta categoría' });
      }
    }

    // Verificar si ya existe un tiempo para este atleta en este evento
    const tiempoExistente = await Tiempo.findOne({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
      evento_id: evento._id,
      atleta_id: atletaId,
    });

    if (tiempoExistente) {
      return res.status(400).json({ error: 'Ya existe un tiempo registrado para este atleta en este evento' });
    }

    // Obtener todos los tiempos del evento para calcular posición
    const tiemposExistentes = await Tiempo.find({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
      evento_id: evento._id,
    });

    // Calcular posición basada en el tiempo
    const tiempoSegundos = tiempoASegundos(tiempo);
    let posicion = tiemposExistentes.length + 1;
    for (const t of tiemposExistentes) {
      if (tiempoASegundos(t.tiempo) < tiempoSegundos) {
        posicion--;
      }
    }

    // Actualizar posiciones de los tiempos existentes si es necesario
    for (const t of tiemposExistentes) {
      if (tiempoASegundos(t.tiempo) > tiempoSegundos) {
        await Tiempo.findByIdAndUpdate(t._id, { posicion: t.posicion + 1 });
      }
    }

    // Calcular puntos
    const totalParticipantes = tiemposExistentes.length + 1;
    const puntos = calcularPuntos(posicion, totalParticipantes);

    // Crear tiempo
    const nuevoTiempo = await Tiempo.create({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
      evento_id: evento._id,
      atleta_id: atletaId,
      inscripcion_id: inscripcion._id,
      tiempo,
      posicion,
      puntos,
      usuario_registro_id: req.user.id,
      estado: 'confirmado',
      observaciones,
    });

    const tiempoPopulado = await Tiempo.findById(nuevoTiempo._id)
      .populate('atleta_id', 'nombre apellido club numero_competidor')
      .populate('evento_id', 'nombre distancia estilo')
      .populate('inscripcion_id', 'numero_competidor')
      .populate('usuario_registro_id', 'nombre apellido');

    res.status(201).json(tiempoPopulado);
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar tiempo
// @route   PUT /api/torneos/:id/categorias/:categoriaId/tiempos/:tiempoId
// @access  Private
export const updateTiempo = async (req, res, next) => {
  try {
    const tiempo = await Tiempo.findById(req.params.tiempoId);

    if (!tiempo) {
      return res.status(404).json({ error: 'Tiempo no encontrado' });
    }

    if (tiempo.torneo_id.toString() !== req.params.id ||
        tiempo.categoria_id.toString() !== req.params.categoriaId) {
      return res.status(400).json({ error: 'El tiempo no pertenece a este torneo/categoría' });
    }

    // Si se actualiza el tiempo, recalcular posición y puntos
    if (req.body.tiempo && req.body.tiempo !== tiempo.tiempo) {
      const tiemposExistentes = await Tiempo.find({
        torneo_id: req.params.id,
        categoria_id: req.params.categoriaId,
        evento_id: tiempo.evento_id,
        _id: { $ne: req.params.tiempoId },
      });

      const tiempoSegundos = tiempoASegundos(req.body.tiempo);
      let posicion = 1;
      for (const t of tiemposExistentes) {
        if (tiempoASegundos(t.tiempo) < tiempoSegundos) {
          posicion++;
        }
      }

      const totalParticipantes = tiemposExistentes.length + 1;
      const puntos = calcularPuntos(posicion, totalParticipantes);

      req.body.posicion = posicion;
      req.body.puntos = puntos;
    }

    const tiempoActualizado = await Tiempo.findByIdAndUpdate(
      req.params.tiempoId,
      req.body,
      { new: true, runValidators: true }
    )
      .populate('atleta_id', 'nombre apellido club numero_competidor')
      .populate('evento_id', 'nombre distancia estilo')
      .populate('inscripcion_id', 'numero_competidor')
      .populate('usuario_registro_id', 'nombre apellido');

    res.json(tiempoActualizado);
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar tiempo
// @route   DELETE /api/torneos/:id/categorias/:categoriaId/tiempos/:tiempoId
// @access  Private
export const deleteTiempo = async (req, res, next) => {
  try {
    const tiempo = await Tiempo.findById(req.params.tiempoId);

    if (!tiempo) {
      return res.status(404).json({ error: 'Tiempo no encontrado' });
    }

    if (tiempo.torneo_id.toString() !== req.params.id ||
        tiempo.categoria_id.toString() !== req.params.categoriaId) {
      return res.status(400).json({ error: 'El tiempo no pertenece a este torneo/categoría' });
    }

    await tiempo.deleteOne();

    res.json({ message: 'Tiempo eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};

