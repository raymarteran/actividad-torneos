import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const usuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, 'El email es requerido'],
    unique: true,
    lowercase: true,
    trim: true,
  },
  password: {
    type: String,
    required: [true, 'La contraseña es requerida'],
    minlength: 6,
    select: false,
  },
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
  rol: {
    type: String,
    enum: ['admin', 'juez', 'organizador'],
    default: 'organizador',
  },
  activo: {
    type: Boolean,
    default: true,
  },
}, {
  timestamps: true,
});

// Encriptar contraseña antes de guardar
usuarioSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    next();
  }
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Método para comparar contraseñas
usuarioSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Eliminar password del JSON de respuesta
usuarioSchema.methods.toJSON = function() {
  const obj = this.toObject();
  delete obj.password;
  return obj;
};

const Usuario = mongoose.model('Usuario', usuarioSchema);

export default Usuario;

