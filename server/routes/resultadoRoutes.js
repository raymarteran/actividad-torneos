import express from 'express';
import {
  getResultados,
  getResultadosByCategoria,
  generarClasificacion,
} from '../controllers/resultadoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rutas anidadas bajo torneos
router.get('/torneos/:id/resultados', protect, getResultados);
router.get('/torneos/:id/categorias/:categoriaId/resultados', protect, getResultadosByCategoria);
router.post('/torneos/:id/categorias/:categoriaId/clasificacion', protect, generarClasificacion);

export default router;

