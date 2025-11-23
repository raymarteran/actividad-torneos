import mongoose from 'mongoose';

const tiempoSchema = new mongoose.Schema({
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
  evento_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Evento',
    required: true,
  },
  atleta_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Atleta',
    required: true,
  },
  inscripcion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inscripcion',
    required: true,
  },
  tiempo: {
    type: String,
    required: [true, 'El tiempo es requerido'],
    trim: true,
  },
  posicion: {
    type: Number,
    min: 1,
  },
  puntos: {
    type: Number,
    default: 0,
    min: 0,
  },
  usuario_registro_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario',
    required: true,
  },
  fecha_registro: {
    type: Date,
    default: Date.now,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmado', 'descalificado'],
    default: 'pendiente',
  },
  observaciones: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

const Tiempo = mongoose.model('Tiempo', tiempoSchema);

export default Tiempo;

