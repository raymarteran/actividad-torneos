import jwt from 'jsonwebtoken';
import config from '../config/config.js';
import Usuario from '../models/Usuario.js';

export const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      // Obtener token del header
      token = req.headers.authorization.split(' ')[1];

      // Verificar token
      const decoded = jwt.verify(token, config.jwtSecret);

      // Obtener usuario del token (sin password)
      req.user = await Usuario.findById(decoded.id).select('-password');

      if (!req.user) {
        return res.status(401).json({ error: 'Usuario no encontrado' });
      }

      if (!req.user.activo) {
        return res.status(401).json({ error: 'Usuario inactivo' });
      }

      next();
    } catch (error) {
      return res.status(401).json({ error: 'Token no válido' });
    }
  }

  if (!token) {
    return res.status(401).json({ error: 'No autorizado, no hay token' });
  }
};

// Middleware para verificar roles
export const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({ error: 'No autorizado' });
    }

    if (!roles.includes(req.user.rol)) {
      return res.status(403).json({ error: 'No tienes permisos para realizar esta acción' });
    }

    next();
  };
};

