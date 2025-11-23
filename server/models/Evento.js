import mongoose from 'mongoose';

const eventoSchema = new mongoose.Schema({
  torneo_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Torneo',
    required: true,
  },
  nombre: {
    type: String,
    required: [true, 'El nombre del evento es requerido'],
    trim: true,
  },
  distancia: {
    type: String,
    trim: true,
  },
  estilo: {
    type: String,
    trim: true,
  },
  descripcion: {
    type: String,
    trim: true,
  },
  orden: {
    type: Number,
    default: 0,
  },
}, {
  timestamps: true,
});

const Evento = mongoose.model('Evento', eventoSchema);

export default Evento;

