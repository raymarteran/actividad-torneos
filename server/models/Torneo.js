import mongoose from 'mongoose';

const torneoSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre del torneo es requerido'],
    trim: true,
  },
  deporte: {
    type: String,
    required: [true, 'El deporte es requerido'],
    trim: true,
  },
  fecha: {
    type: Date,
    required: [true, 'La fecha del torneo es requerida'],
  },
  ubicacion: {
    type: String,
    required: [true, 'La ubicación es requerida'],
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  usuario_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  estado: {
    type: String,
    enum: ['planificado', 'en_curso', 'finalizado', 'cancelado'],
    default: 'planificado',
  },
}, {
  timestamps: true,
});

const Torneo = mongoose.model('Torneo', torneoSchema);

export default Torneo;

