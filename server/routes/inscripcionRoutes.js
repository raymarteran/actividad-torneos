import express from 'express';
import {
  getInscripciones,
  getInscripcionesByCategoria,
  createInscripcion,
} from '../controllers/inscripcionController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rutas anidadas bajo torneos
router.get('/inscritorneos/:id/inscripciones', protect, getInscripciones);
router.get('/inscritorneos/:id/categorias/:categoriaId/inscripciones', protect, getInscripcionesByCategoria);
router.post('/inscritorneos/:id/categorias/:categoriaId/inscripciones', protect, createInscripcion);

export default router;

