import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import Usuario from '../models/Usuario.js';

// Generar JWT Token
const generateToken = (id) => {
  return jwt.sign({ id }, config.jwtSecret, {
    expiresIn: config.jwtExpire,
  });
};

// @desc    Registrar nuevo usuario
// @route   POST /api/auth/register
// @access  Public
export const register = async (req, res, next) => {
  try {
    const { email, password, nombre, apellido, rol } = req.body;

    // Validar campos requeridos
    if (!email || !password || !nombre || !apellido) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Verificar si el usuario ya existe
    const usuarioExiste = await Usuario.findOne({ email });
    if (usuarioExiste) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    // Crear usuario
    const usuario = await Usuario.create({
      email,
      password,
      nombre,
      apellido,
      rol: rol || 'organizador',
    });

    // Generar token
    const token = generateToken(usuario._id);

    res.status(201).json({
      token,
      user: {
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Autenticar usuario
// @route   POST /api/auth/login
// @access  Public
export const login = async (req, res, next) => {
  try {
    console.log("entra en el login");
    const { email, password } = req.body;
    console.log("Email recibido:", email);
    
    // Validar campos
    if (!email || !password) {
      return res.status(400).json({ error: 'Email y contraseña son requeridos' });
    }

    // Verificar usuario y contraseña
    // Normalizar email a minúsculas para la búsqueda
    const emailNormalized = email.toLowerCase().trim();
    const usuario = await Usuario.findOne({ email: emailNormalized }).select('+password');
    
    if (!usuario) {
      console.log("Usuario no encontrado para email:", emailNormalized);
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    console.log("Usuario encontrado:", usuario.email, "Activo:", usuario.activo);

    // Verificar si el usuario está activo
    if (!usuario.activo) {
      return res.status(401).json({ error: 'Usuario inactivo' });
    }

    // Verificar contraseña
    const isMatch = await usuario.matchPassword(password);
    console.log("Contraseña coincide:", isMatch);
    
    if (!isMatch) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar token
    const token = generateToken(usuario._id);

    res.json({
      token,
      user: {
        id: usuario._id,
        email: usuario.email,
        nombre: usuario.nombre,
        apellido: usuario.apellido,
        rol: usuario.rol,
      },
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Obtener usuario actual
// @route   GET /api/auth/me
// @access  Private
export const getMe = async (req, res, next) => {
  try {
    const usuario = await Usuario.findById(req.user.id);
    res.json({
      id: usuario._id,
      email: usuario.email,
      nombre: usuario.nombre,
      apellido: usuario.apellido,
      rol: usuario.rol,
    });
  } catch (error) {
    next(error);
  }
};

