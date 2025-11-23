import express from 'express';
import {
  getAtletas,
  getAtleta,
  createAtleta,
  updateAtleta,
  deleteAtleta,
} from '../controllers/atletaController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.get('/', protect, getAtletas);
router.get('/:id', protect, getAtleta);
router.post('/', protect, createAtleta);
router.put('/:id', protect, updateAtleta);
router.delete('/:id', protect, deleteAtleta);

export default router;

