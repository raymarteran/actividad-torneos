import mongoose from 'mongoose';

const categoriaSchema = new mongoose.Schema({
  torneo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Torneo',
    required: true,
  },
  nombre: {
    type: String,
    required: [true, 'El nombre de la categoría es requerido'],
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  edad_minima: {
    type: Number,
    min: 0,
  },
  edad_maxima: {
    type: Number,
    min: 0,
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino', 'Mixto'],
    default: 'Mixto',
  },
}, {
  timestamps: true,
});

const Categoria = mongoose.model('Categoria', categoriaSchema);

export default Categoria;

