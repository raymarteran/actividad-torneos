import express from 'express';
import {
  getTorneos,
  getTorneo,
  createTorneo,
  updateTorneo,
  deleteTorneo,
  getCategorias,
  createCategoria,
  updateCategoria,
  deleteCategoria,
} from '../controllers/torneoController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

// Rutas de torneos
router.get('/', protect, getTorneos);
router.get('/:id', protect, getTorneo);
router.post('/', protect, createTorneo);
router.put('/:id', protect, updateTorneo);
router.delete('/:id', protect, deleteTorneo);

// Rutas de categorías
router.get('/:id/categorias', protect, getCategorias);
router.post('/:id/categorias', protect, createCategoria);
router.put('/:id/categorias/:categoriaId', protect, updateCategoria);
router.delete('/:id/categorias/:categoriaId', protect, deleteCategoria);

export default router;

