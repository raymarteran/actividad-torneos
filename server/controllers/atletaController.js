import Atleta from '../models/Atleta.js';

// @desc    Obtener todos los atletas
// @route   GET /api/atletas
// @access  Private
export const getAtletas = async (req, res, next) => {
  try {
    const atletas = await Atleta.find().sort({ apellido: 1, nombre: 1 });
    res.json(atletas);
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener un atleta por ID
// @route   GET /api/atletas/:id
// @access  Private
export const getAtleta = async (req, res, next) => {
  try {
    const atleta = await Atleta.findById(req.params.id);

    if (!atleta) {
      return res.status(404).json({ error: 'Atleta no encontrado' });
    }

    res.json(atleta);
  } catch (error) {
    next(error);
  }
};

// @desc    Crear nuevo atleta
// @route   POST /api/atletas
// @access  Private
export const createAtleta = async (req, res, next) => {
  try {
    const atleta = await Atleta.create(req.body);
    res.status(201).json(atleta);
  } catch (error) {
    next(error);
  }
};

// @desc    Actualizar atleta
// @route   PUT /api/atletas/:id
// @access  Private
export const updateAtleta = async (req, res, next) => {
  try {
    const atleta = await Atleta.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!atleta) {
      return res.status(404).json({ error: 'Atleta no encontrado' });
    }

    res.json(atleta);
  } catch (error) {
    next(error);
  }
};

// @desc    Eliminar atleta
// @route   DELETE /api/atletas/:id
// @access  Private
export const deleteAtleta = async (req, res, next) => {
  try {
    const atleta = await Atleta.findById(req.params.id);

    if (!atleta) {
      return res.status(404).json({ error: 'Atleta no encontrado' });
    }

    await atleta.deleteOne();

    res.json({ message: 'Atleta eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
};

