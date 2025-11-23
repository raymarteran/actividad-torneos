import mongoose from 'mongoose';

const inscripcionSchema = new mongoose.Schema({
  torneo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Torneo',
    required: true,
  },
  categoria_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Categoria',
    required: true,
  },
  atleta_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Atleta',
    required: true,
  },
  numero_competidor: {
    type: String,
    required: true,
    trim: true,
  },
  fecha_inscripcion: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente',
  },
  observaciones: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Índice único para número de competidor por torneo
inscripcionSchema.index({ torneo_id: 1, numero_competidor: 1 }, { unique: true });

// Índice para evitar inscripciones duplicadas
inscripcionSchema.index({ torneo_id: 1, categoria_id: 1, atleta_id: 1 }, { unique: true });

const Inscripcion = mongoose.model('Inscripcion', inscripcionSchema);

export default Inscripcion;

