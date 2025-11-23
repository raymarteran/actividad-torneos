import express from 'express';
import {
  getTiempos,
  createTiempo,
  updateTiempo,
  deleteTiempo,
} from '../controllers/tiempoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rutas anidadas bajo torneos/categorias
router.get('/torneos/:id/categorias/:categoriaId/tiempos', protect, getTiempos);
router.post('/torneos/:id/categorias/:categoriaId/tiempos', protect, createTiempo);
router.put('/torneos/:id/categorias/:categoriaId/tiempos/:tiempoId', protect, updateTiempo);
router.delete('/torneos/:id/categorias/:categoriaId/tiempos/:tiempoId', protect, deleteTiempo);

export default router;

