import Inscripcion from '../models/Inscripcion.js';
import Torneo from '../models/Torneo.js';
import Categoria from '../models/Categoria.js';
import Atleta from '../models/Atleta.js';

// @desc    Obtener todas las inscripciones de un torneo
// @route   GET /api/torneos/:id/inscripciones
// @access  Private
export const getInscripciones = async (req, res, next) => {
  try {
    const inscripciones = await Inscripcion.find({ torneo_id: req.params.id })
      .populate('atleta_id', 'nombre apellido club email')
      .populate('categoria_id', 'nombre genero')
      .sort({ fecha_inscripcion: -1 });

    res.json(inscripciones);
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener inscripciones por categoría
// @route   GET /api/torneos/:id/categorias/:categoriaId/inscripciones
// @access  Private
export const getInscripcionesByCategoria = async (req, res, next) => {
  try {
    const inscripciones = await Inscripcion.find({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
    })
      .populate('atleta_id', 'nombre apellido club email especialidad')
      .populate('categoria_id', 'nombre genero')
      .sort({ numero_competidor: 1 });

    res.json(inscripciones);
  } catch (error) {
    next(error);
  }
};

// @desc    Crear inscripción
// @route   POST /api/torneos/:id/categorias/:categoriaId/inscripciones
// @access  Private
export const createInscripcion = async (req, res, next) => {
  try {
    const { atletaId, nombre, apellido, email, telefono, fechaNacimiento, genero } = req.body;

    // Verificar que el torneo existe
    const torneo = await Torneo.findById(req.params.id);
    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    // Verificar que la categoría existe y pertenece al torneo
    const categoria = await Categoria.findById(req.params.categoriaId);
    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }
    if (categoria.torneo_id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'La categoría no pertenece a este torneo' });
    }

    // Obtener o crear el atleta
    let atleta;
    if (atletaId) {
      // Si se proporciona un ID, buscar el atleta existente
      atleta = await Atleta.findById(atletaId);
      if (!atleta) {
        return res.status(404).json({ error: 'Atleta no encontrado' });
      }
    } else {
      // Si se proporcionan los datos del atleta, buscar por email o crear uno nuevo
      if (!nombre || !apellido || !email || !fechaNacimiento) {
        return res.status(400).json({ error: 'Faltan datos requeridos del atleta (nombre, apellido, email, fechaNacimiento)' });
      }

      // Buscar atleta existente por email
      atleta = await Atleta.findOne({ email: email.toLowerCase() });

      if (!atleta) {
        // Si no existe, crear nuevo atleta
        // Si no se proporciona género, usar el de la categoría si no es Mixto, o Masculino por defecto
        const generoAtleta = genero || (categoria.genero !== 'Mixto' ? categoria.genero : 'Masculino');
        
        atleta = await Atleta.create({
          nombre,
          apellido,
          email: email.toLowerCase(),
          telefono: telefono || '',
          fecha_nacimiento: fechaNacimiento,
          genero: generoAtleta,
        });
      } else {
        // Si existe, actualizar datos si se proporcionan
        if (nombre) atleta.nombre = nombre;
        if (apellido) atleta.apellido = apellido;
        if (telefono) atleta.telefono = telefono;
        if (fechaNacimiento) atleta.fecha_nacimiento = fechaNacimiento;
        if (genero) atleta.genero = genero;
        await atleta.save();
      }
    }

    // Validar edad del atleta si la categoría tiene restricciones
    if (categoria.edad_minima || categoria.edad_maxima) {
      const edad = atleta.edad;
      if (categoria.edad_minima && edad < categoria.edad_minima) {
        return res.status(400).json({ error: `El atleta no cumple la edad mínima (${categoria.edad_minima} años)` });
      }
      if (categoria.edad_maxima && edad > categoria.edad_maxima) {
        return res.status(400).json({ error: `El atleta excede la edad máxima (${categoria.edad_maxima} años)` });
      }
    }

    // Validar género si la categoría tiene restricción
    if (categoria.genero !== 'Mixto' && atleta.genero !== categoria.genero) {
      return res.status(400).json({ error: `El género del atleta no coincide con la categoría` });
    }

    // Generar número de competidor único
    const ultimaInscripcion = await Inscripcion.findOne({ torneo_id: req.params.id })
      .sort({ numero_competidor: -1 });

    let numeroCompetidor;
    if (ultimaInscripcion && ultimaInscripcion.numero_competidor) {
      const ultimoNumero = parseInt(ultimaInscripcion.numero_competidor.replace('COMP-', '')) || 0;
      numeroCompetidor = `COMP-${String(ultimoNumero + 1).padStart(4, '0')}`;
    } else {
      numeroCompetidor = 'COMP-0001';
    }

    // Verificar que no exista ya una inscripción para este atleta en esta categoría
    const inscripcionExistente = await Inscripcion.findOne({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
      atleta_id: atleta._id,
    });

    if (inscripcionExistente) {
      return res.status(400).json({ error: 'El atleta ya está inscrito en esta categoría' });
    }

    // Crear inscripción
    const inscripcion = await Inscripcion.create({
      torneo_id: req.params.id,
      categoria_id: req.params.categoriaId,
      atleta_id: atleta._id,
      numero_competidor: numeroCompetidor,
      estado: 'confirmada',
      observaciones: req.body.observaciones,
    });

    const inscripcionPopulada = await Inscripcion.findById(inscripcion._id)
      .populate('atleta_id', 'nombre apellido club email especialidad')
      .populate('categoria_id', 'nombre genero');

    res.status(201).json(inscripcionPopulada);
  } catch (error) {
    next(error);
  }
};

