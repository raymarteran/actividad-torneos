import Torneo from '../models/Torneo.js';
import Categoria from '../models/Categoria.js';
import Evento from '../models/Evento.js';
import mongoose from 'mongoose';

// @desc    Obtener todos los torneos
// @route   GET /api/torneos
// @access  Private
export const getTorneos = async (req, res, next) => {
  try {
    const torneos = await Torneo.find()
      .populate('usuario_id', 'nombre apellido email')
      .sort({ createdAt: -1 });
    res.json(torneos);
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un torneo por ID
// @route   GET /api/torneos/:id
// @access  Private
export const getTorneo = async (req, res, next) => {
  try {
    const torneo = await Torneo.findById(req.params.id)
      .populate('usuario_id', 'nombre apellido email');

    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    // Obtener categorías y eventos del torneo
    const categorias = await Categoria.find({ torneo_id: torneo._id });
    const eventos = await Evento.find({ torneo_id: torneo._id }).sort({ orden: 1 });

    res.json({
      ...torneo.toObject(),
      categorias,
      eventos,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nuevo torneo
// @route   POST /api/torneos
// @access  Private
export const createTorneo = async (req, res, next) => {
  try {
    const torneo = await Torneo.create({
      ...req.body,
      usuario_id: req.user.id,
    });

    // tambien debe guardar si tiene categorias y eventos
    // deber guardar N categorias y N eventos
    for (const categoria of req.body.categorias) {
      await Categoria.create({
        torneo_id: torneo._id,
        nombre: categoria,
      });
    }
    for (const evento of req.body.eventos) {
      await Evento.create({
        torneo_id: torneo._id,
        nombre: evento,
      });
    }

    const torneoPopulado = await Torneo.findById(torneo._id)
      .populate('usuario_id', 'nombre apellido email');

    res.status(201).json(torneoPopulado);
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar torneo
// @route   PUT /api/torneos/:id
// @access  Private
export const updateTorneo = async (req, res, next) => {
  try {
    let torneo = await Torneo.findById(req.params.id);

    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    // Verificar que el usuario sea el creador o admin
    if (torneo.usuario_id.toString() !== req.user.id && req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'No autorizado para modificar este torneo' });
    }

    torneo = await Torneo.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    }).populate('usuario_id', 'nombre apellido email');

    res.json(torneo);
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar torneo
// @route   DELETE /api/torneos/:id
// @access  Private
export const deleteTorneo = async (req, res, next) => {
  try {
    const torneo = await Torneo.findById(req.params.id);

    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    // Verificar que el usuario sea el creador o admin
    if (torneo.usuario_id.toString() !== req.user.id && req.user.rol !== 'admin') {
      return res.status(403).json({ error: 'No autorizado para eliminar este torneo' });
    }

    await torneo.deleteOne();

    res.json({ message: 'Torneo eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener categorías de un torneo
// @route   GET /api/torneos/:id/categorias
// @access  Private
export const getCategorias = async (req, res, next) => {
  try {
    console.log("req.params.id", req.params.id);
    // convertir req.params.id a ObjectId
    const torneoId = new mongoose.Types.ObjectId(req.params.id);
    const categorias = await Categoria.find({ torneo_id: torneoId });
    res.json(categorias);
  } catch (error) {
    next(error);
  }
};

// @desc    Crear categoría en un torneo
// @route   POST /api/torneos/:id/categorias
// @access  Private
export const createCategoria = async (req, res, next) => {
  try {
    const torneo = await Torneo.findById(req.params.id);
    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const categoria = await Categoria.create({
      ...req.body,
      torneo_id: req.params.id,
    });

    res.status(201).json(categoria);
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar categoría
// @route   PUT /api/torneos/:id/categorias/:categoriaId
// @access  Private
export const updateCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findById(req.params.categoriaId);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    if (categoria.torneo_id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'La categoría no pertenece a este torneo' });
    }

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      req.params.categoriaId,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(categoriaActualizada);
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar categoría
// @route   DELETE /api/torneos/:id/categorias/:categoriaId
// @access  Private
export const deleteCategoria = async (req, res, next) => {
  try {
    const categoria = await Categoria.findById(req.params.categoriaId);

    if (!categoria) {
      return res.status(404).json({ error: 'Categoría no encontrada' });
    }

    if (categoria.torneo_id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'La categoría no pertenece a este torneo' });
    }

    await categoria.deleteOne();

    res.json({ message: 'Categoría eliminada exitosamente' });
  } catch (error) {
    next(error);
  }
};

