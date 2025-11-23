import mongoose from 'mongoose';

const atletaSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: [true, 'El nombre es requerido'],
    trim: true,
  },
  apellido: {
    type: String,
    required: [true, 'El apellido es requerido'],
    trim: true,
  },
  fecha_nacimiento: {
    type: Date,
    required: [true, 'La fecha de nacimiento es requerida'],
  },
  genero: {
    type: String,
    enum: ['Masculino', 'Femenino'],
    required: [true, 'El género es requerido'],
  },
  nacionalidad: {
    type: String,
    trim: true,
  },
  club: {
    type: String,
    trim: true,
  },
  email: {
    type: String,
    unique: true,
    sparse: true,
    lowercase: true,
    trim: true,
  },
  telefono: {
    type: String,
    trim: true,
  },
  especialidad: {
    type: String,
    trim: true,
  },
  mejor_tiempo: {
    type: String,
    trim: true,
  },
  categoria_preferida: {
    type: String,
    trim: true,
  },
}, {
  timestamps: true,
});

// Método virtual para calcular la edad
atletaSchema.virtual('edad').get(function() {
  if (!this.fecha_nacimiento) return null;
  const today = new Date();
  const birthDate = new Date(this.fecha_nacimiento);
  let age = today.getFullYear() - birthDate.getFullYear();
  const monthDiff = today.getMonth() - birthDate.getMonth();
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birthDate.getDate())) {
    age--;
  }
  return age;
});

atletaSchema.set('toJSON', { virtuals: true });

const Atleta = mongoose.model('Atleta', atletaSchema);

export default Atleta;

