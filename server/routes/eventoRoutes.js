import express from 'express';
import Evento from '../models/Evento.js';
import Torneo from '../models/Torneo.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// @desc    Obtener eventos de un torneo
// @route   GET /api/torneos/:id/eventos
// @access  Private
router.get('/torneos/:id/eventos', protect, async (req, res, next) => {
  try {
    const torneo = await Torneo.findById(req.params.id);
    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const eventos = await Evento.find({ torneo_id: req.params.id }).sort({ orden: 1 });
    res.json(eventos);
  } catch (error) {
    next(error);
  }
});

// @desc    Crear evento en un torneo
// @route   POST /api/torneos/:id/eventos
// @access  Private
router.post('/torneos/:id/eventos', protect, async (req, res, next) => {
  try {
    const torneo = await Torneo.findById(req.params.id);
    if (!torneo) {
      return res.status(404).json({ error: 'Torneo no encontrado' });
    }

    const evento = await Evento.create({
      ...req.body,
      torneo_id: req.params.id,
    });

    res.status(201).json(evento);
  } catch (error) {
    next(error);
  }
});

// @desc    Actualizar evento
// @route   PUT /api/torneos/:id/eventos/:eventoId
// @access  Private
router.put('/torneos/:id/eventos/:eventoId', protect, async (req, res, next) => {
  try {
    const evento = await Evento.findById(req.params.eventoId);

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    if (evento.torneo_id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'El evento no pertenece a este torneo' });
    }

    const eventoActualizado = await Evento.findByIdAndUpdate(
      req.params.eventoId,
      req.body,
      { new: true, runValidators: true }
    );

    res.json(eventoActualizado);
  } catch (error) {
    next(error);
  }
});

// @desc    Eliminar evento
// @route   DELETE /api/torneos/:id/eventos/:eventoId
// @access  Private
router.delete('/torneos/:id/eventos/:eventoId', protect, async (req, res, next) => {
  try {
    const evento = await Evento.findById(req.params.eventoId);

    if (!evento) {
      return res.status(404).json({ error: 'Evento no encontrado' });
    }

    if (evento.torneo_id.toString() !== req.params.id) {
      return res.status(400).json({ error: 'El evento no pertenece a este torneo' });
    }

    await evento.deleteOne();

    res.json({ message: 'Evento eliminado exitosamente' });
  } catch (error) {
    next(error);
  }
});

export default router;

