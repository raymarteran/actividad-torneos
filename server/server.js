import express from 'express';
import cors from 'cors';
import config from './config/config.js';
import connectDB from './config/database.js';
import { errorHandler } from './middleware/errorHandler.js';

// Importar rutas
import authRoutes from './routes/authRoutes.js';
import torneoRoutes from './routes/torneoRoutes.js';
import atletaRoutes from './routes/atletaRoutes.js';
import inscripcionRoutes from './routes/inscripcionRoutes.js';
import tiempoRoutes from './routes/tiempoRoutes.js';
import resultadoRoutes from './routes/resultadoRoutes.js';
import eventoRoutes from './routes/eventoRoutes.js';

// Conectar a la base de datos
connectDB();

// Crear aplicación Express
const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/auth', authRoutes);
app.use('/api/torneos', torneoRoutes);
app.use('/api/atletas', atletaRoutes);
app.use('/api', inscripcionRoutes);
app.use('/api', tiempoRoutes);
app.use('/api', resultadoRoutes);
app.use('/api', eventoRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ message: 'API funcionando correctamente', status: 'OK' });
});

// Manejo de errores
app.use(errorHandler);

// Iniciar servidor
const PORT = config.port || 5000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});

