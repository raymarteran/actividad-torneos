# Backend API - Sistema de Gestión de Torneos

API REST desarrollada con Node.js, Express y MongoDB Atlas para el sistema de gestión de torneos deportivos.

## 🚀 Características

- Autenticación JWT
- CRUD completo para todas las entidades
- Validación de datos con Mongoose
- Manejo de errores centralizado
- CORS habilitado
- Estructura modular y escalable

## 📋 Requisitos Previos

- Node.js (v16 o superior)
- MongoDB Atlas (cuenta y cluster configurado)
- npm o yarn

## 🔧 Instalación

1. Instalar dependencias:
```bash
npm install
```

2. Configurar variables de entorno:
   - Copiar `.env.example` a `.env`
   - Configurar `MONGODB_URI` con tu cadena de conexión de MongoDB Atlas
   - Configurar `JWT_SECRET` con una clave secreta segura

3. Iniciar servidor:
```bash
npm start
```

Para desarrollo con recarga automática:
```bash
npm run dev
```

## 📁 Estructura del Proyecto

```
server/
├── config/
│   ├── config.js          # Configuración general
│   └── database.js        # Conexión a MongoDB
├── controllers/
│   ├── authController.js
│   ├── torneoController.js
│   ├── atletaController.js
│   ├── inscripcionController.js
│   ├── tiempoController.js
│   └── resultadoController.js
├── middleware/
│   ├── auth.js            # Autenticación JWT
│   └── errorHandler.js    # Manejo de errores
├── models/
│   ├── Usuario.js
│   ├── Torneo.js
│   ├── Categoria.js
│   ├── Evento.js
│   ├── Atleta.js
│   ├── Inscripcion.js
│   ├── Tiempo.js
│   └── Resultado.js
├── routes/
│   ├── authRoutes.js
│   ├── torneoRoutes.js
│   ├── atletaRoutes.js
│   ├── inscripcionRoutes.js
│   ├── tiempoRoutes.js
│   ├── resultadoRoutes.js
│   └── eventoRoutes.js
├── server.js              # Archivo principal
└── package.json
```

## 🔐 Autenticación

Todas las rutas (excepto `/api/auth/login` y `/api/auth/register`) requieren autenticación JWT.

**Header requerido:**
```
Authorization: Bearer <token>
```

## 📡 Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/me` - Obtener usuario actual

### Torneos
- `GET /api/torneos` - Listar todos los torneos
- `GET /api/torneos/:id` - Obtener torneo por ID
- `POST /api/torneos` - Crear torneo
- `PUT /api/torneos/:id` - Actualizar torneo
- `DELETE /api/torneos/:id` - Eliminar torneo

### Categorías
- `GET /api/torneos/:id/categorias` - Listar categorías de un torneo
- `POST /api/torneos/:id/categorias` - Crear categoría
- `PUT /api/torneos/:id/categorias/:categoriaId` - Actualizar categoría
- `DELETE /api/torneos/:id/categorias/:categoriaId` - Eliminar categoría

### Eventos
- `GET /api/torneos/:id/eventos` - Listar eventos de un torneo
- `POST /api/torneos/:id/eventos` - Crear evento
- `PUT /api/torneos/:id/eventos/:eventoId` - Actualizar evento
- `DELETE /api/torneos/:id/eventos/:eventoId` - Eliminar evento

### Atletas
- `GET /api/atletas` - Listar todos los atletas
- `GET /api/atletas/:id` - Obtener atleta por ID
- `POST /api/atletas` - Crear atleta
- `PUT /api/atletas/:id` - Actualizar atleta
- `DELETE /api/atletas/:id` - Eliminar atleta

### Inscripciones
- `GET /api/torneos/:id/inscripciones` - Listar inscripciones de un torneo
- `GET /api/torneos/:id/categorias/:categoriaId/inscripciones` - Listar inscripciones por categoría
- `POST /api/torneos/:id/categorias/:categoriaId/inscripciones` - Crear inscripción

### Tiempos
- `GET /api/torneos/:id/categorias/:categoriaId/tiempos` - Listar tiempos
- `POST /api/torneos/:id/categorias/:categoriaId/tiempos` - Registrar tiempo
- `PUT /api/torneos/:id/categorias/:categoriaId/tiempos/:tiempoId` - Actualizar tiempo
- `DELETE /api/torneos/:id/categorias/:categoriaId/tiempos/:tiempoId` - Eliminar tiempo

### Resultados
- `GET /api/torneos/:id/resultados` - Obtener resultados del torneo
- `GET /api/torneos/:id/categorias/:categoriaId/resultados` - Obtener resultados por categoría
- `POST /api/torneos/:id/categorias/:categoriaId/clasificacion` - Generar clasificación

## 🔒 Variables de Entorno

```env
PORT=5000
MONGODB_URI=mongodb+srv://usuario:password@cluster.mongodb.net/torneos?retryWrites=true&w=majority
JWT_SECRET=tu_clave_secreta_super_segura_aqui
JWT_EXPIRE=7d
```

## 📝 Notas

- El servidor corre en el puerto 5000 por defecto
- Todas las respuestas de error devuelven un objeto con la propiedad `error`
- Las contraseñas se encriptan automáticamente con bcrypt
- Los tokens JWT expiran en 7 días por defecto (configurable)

