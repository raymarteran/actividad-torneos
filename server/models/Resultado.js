import mongoose from 'mongoose';

const resultadSchema = new mongoose.Schema({
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
  inscripcion_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Inscripcion',
    required: true,
  },
  posicion_final: {
    type: Number,
    required: true,
    min: 1,
  },
  puntos_totales: {
    type: Number,
    required: true,
    default: 0,
    min: 0,
  },
  mejor_tiempo: {
    type: String,
    trim: true,
  },
  cantidad_eventos: {
    type: Number,
    default: 0,
    min: 0,
  },
  fecha_generacion: {
    type: Date,
    default: Date.now,
  },
}, {
  timestamps: true,
});

// Índice único para un resultado por atleta por categoría en un torneo
resultadSchema.index({ torneo_id: 1, categoria_id: 1, atleta_id: 1 }, { unique: true });

const Resultado = mongoose.model('Resultado', resultadSchema);

export default Resultado;

