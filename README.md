# Sistema de Gestión de Torneos

Aplicación web desarrollada con React y Vite para la gestión de torneos deportivos. Permite administrar torneos, inscripciones, resultados y tiempos de competencias.

## Autor

**Raymar Teran**  
CI: 25604593

## Información del Proyecto

Este proyecto fue desarrollado para la materia **Frontend 2** de la **Universidad Valle del Momboy**, como parte de la carrera de **Ingeniería de Computación**.

## Tecnologías Utilizadas

### Frontend
- React 19
- Vite
- React Router DOM
- Tailwind CSS
- Axios
- Lucide React

### Backend
- Node.js
- Express
- MongoDB (MongoDB Atlas)
- Mongoose
- JWT (jsonwebtoken)
- bcryptjs
- CORS

## Requisitos Previos

- Node.js (v16 o superior)
- npm o yarn
- MongoDB Atlas (cuenta y cluster configurado) o MongoDB local
- Git

## Instalación

### Frontend

1. Instalar dependencias:
```bash
npm install
```

2. Iniciar el servidor de desarrollo:
```bash
npm run dev
```

El frontend estará disponible en `http://localhost:5173` (puerto por defecto de Vite).

### Backend

1. Navegar al directorio del servidor:
```bash
cd server
```

2. Instalar dependencias:
```bash
npm install
```

3. Configurar variables de entorno:
   - Copiar el archivo `.env.example` a `.env`:
   ```bash
   cp env.example .env
   ```
   
   - Editar el archivo `.env` y configurar las siguientes variables:
   ```env
   PORT=5000
   MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/torneos?retryWrites=true&w=majority
   JWT_SECRET=tu_clave_secreta_super_segura_aqui
   JWT_EXPIRE=7d
   ```
   
   **Nota:** Reemplaza `MONGODB_URI` con tu cadena de conexión de MongoDB Atlas y `JWT_SECRET` con una clave secreta segura.

4. Iniciar el servidor:
```bash
npm start
```

Para desarrollo con recarga automática:
```bash
npm run dev
```

El backend estará disponible en `http://localhost:5000`.

## Scripts Disponibles

### Frontend
- `npm run dev` - Inicia el servidor de desarrollo

### Backend
- `npm start` - Inicia el servidor en modo producción
- `npm run dev` - Inicia el servidor en modo desarrollo con recarga automática

## Estructura del Proyecto

```
torneos/
├── server/                 # Backend API
│   ├── config/            # Configuración y conexión a BD
│   ├── controllers/       # Controladores de la API
│   ├── middleware/        # Middleware de autenticación y errores
│   ├── models/            # Modelos de Mongoose
│   ├── routes/            # Rutas de la API
│   └── server.js          # Archivo principal del servidor
├── src/                   # Frontend React
│   ├── components/        # Componentes reutilizables
│   ├── page/             # Páginas de la aplicación
│   └── services/         # Servicios de API
└── README.md
```

## Configuración de la API

El backend expone una API REST en el puerto 5000. Todas las rutas (excepto `/api/auth/login` y `/api/auth/register`) requieren autenticación JWT mediante el header:

```
Authorization: Bearer <token>
```

## Notas Importantes

- Asegúrate de que el backend esté corriendo antes de iniciar el frontend
- El frontend está configurado para conectarse al backend en `http://localhost:5000`
- Las contraseñas se encriptan automáticamente con bcrypt
- Los tokens JWT expiran en 7 días por defecto (configurable en `.env`)