# 📅 Appointment Management System – REST API & Frontend

Aplicación **fullstack** desarrollada con **Node.js y Express** que implementa una **API RESTful** para la gestión de turnos y usuarios, junto con un **frontend web** que consume dicha API.

El proyecto está orientado a demostrar buenas prácticas de **arquitectura backend**, autenticación con **JWT**, validación de datos y persistencia utilizando **archivos JSON**, sin depender de una base de datos externa.

---

## 🔧 Stack Tecnológico

### Backend

* Node.js
* Express
* JSON Web Token (JWT)
* Bcrypt
* Zod
* Dotenv
* CORS
* File System (`fs`) para persistencia

### Frontend

* HTML5
* CSS3
* JavaScript

---

## 🧱 Arquitectura

El backend sigue una arquitectura **MVC simplificada**, con responsabilidades bien definidas:

* **Config**: configuración del servidor y variables de entorno
* **Model**: lectura y escritura de datos en archivos JSON
* **Controller**: lógica de negocio y validaciones
* **Routes**: definición de endpoints REST
* **Middlewares**: protección de rutas mediante JWT
* **Services**: generación y verificación de tokens
* **Data**: persistencia local en archivos JSON

El frontend se sirve como contenido estático y se comunica con la API mediante `fetch`.

---

## ⚙️ Funcionalidades

* Registro de usuarios con contraseña hasheada
* Inicio de sesión con generación de **Token JWT**
* Autenticación y autorización mediante middleware
* CRUD completo de turnos
* Validación de fechas y horarios con **Zod**
* Persistencia de datos sin base de datos externa
* Frontend integrado con flujo de login y gestión de turnos

---

## 🔐 Autenticación

La API utiliza **JSON Web Tokens (JWT)** para proteger las rutas sensibles.

1. El usuario se registra o inicia sesión
2. El servidor devuelve un token JWT
3. El cliente debe enviar el token en el header:

```
Authorization: Bearer <token>
```

4. El middleware valida el token antes de permitir el acceso a las rutas protegidas

---

## 🔌 API Endpoints

### Autenticación

| Método | Endpoint              | Descripción                     |
| ------ | --------------------- | ------------------------------- |
| POST   | `/api/users/register` | Registra un nuevo usuario       |
| POST   | `/api/users/login`    | Inicia sesión y devuelve un JWT |

---

### Gestión de Turnos (Rutas protegidas)

Requieren header:

```
Authorization: Bearer <token>
```

| Método | Endpoint               | Descripción                   |
| ------ | ---------------------- | ----------------------------- |
| GET    | `/api/appointment/`    | Obtener todos los turnos      |
| POST   | `/api/appointment/`    | Crear un nuevo turno          |
| PUT    | `/api/appointment/:id` | Actualizar un turno existente |
| DELETE | `/api/appointment/:id` | Eliminar un turno             |

---

## 📑 Documentación en Postman

La API cuenta con una colección documentada en **Postman**, donde se pueden probar todos los endpoints, flujos de autenticación y rutas protegidas:

🔗 **Postman Collection:**
https://liccamilasoto-8350666.postman.co/workspace/Camila-Soto's-Workspace~dd762bdd-6c15-4d98-818b-e20d88634a51/collection/50946390-0197f16d-4eb4-4d9b-90b4-70a59050bf49?action=share&creator=50946390

---

## 🧪 Ejemplos de Solicitudes

### ➕ Registro de Usuario

**Endpoint:** `POST /api/users/register`

**Headers:**
```http
Content-Type: application/json
```

**Body (JSON):**
```json
{
  "email": "usuario@email.com",
  "password": "123456"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Usuario registrado con éxito."
}
```

---

### ➕ Crear un Turno

> Requiere autenticación JWT

**Endpoint:** `POST /api/appointment/`

**Headers:**
```http
Content-Type: application/json
Authorization: Bearer <token>
```

**Body (JSON):**
```json
{
  "date": "2026-02-15",
  "time": "14:30",
  "client": "Juan Pérez"
}
```

**Respuesta exitosa:**
```json
{
  "message": "Turno creado con éxito.",
  "newAppointment": {
    "id": 1700000000000,
    "date": "2026-02-15",
    "time": "14:30",
    "client": "Juan Pérez"
  }
}
```

---

## 📁 Estructura del Proyecto

```appointment-api/
│
├── backend/
│   ├── config/
│   │   └── config.js              # Configuración de puerto y JWT
│   ├── controllers/
│   │   ├── appointmentController.js # Lógica de turnos + validaciones Zod
│   │   └── userController.js        # Registro y login de usuarios
│   ├── data/
│   │   ├── users.json               # Persistencia de usuarios
│   │   └── appointments.json        # Persistencia de turnos
│   ├── middlewares/
│   │   └── authMiddleware.js        # Protección de rutas con JWT
│   ├── model/
│   │   ├── userModel.js             # Lectura/escritura de usuarios
│   │   └── appointmentModel.js      # Lectura/escritura de turnos
│   ├── routes/
│   │   ├── userRoutes.js            # Endpoints de auth
│   │   └── appointmentRoutes.js     # Endpoints de turnos
│   ├── services/
│   │   └── jwtService.js            # Generación y verificación de tokens
│   └── index.js                     # Punto de entrada del servidor
│
├── public/
│   ├── index.html                   # Vista principal
│   ├── style.css                    # Estilos del frontend
│   └── script.js                    # Lógica del frontend
│
├── .env                             # Variables de entorno
├── package.json
└── README.md
```

````

---

## ▶️ Ejecución Local

1. Instalar dependencias:
```bash
npm install
````

2. Iniciar el servidor:

```bash
node src/index.js
```

Servidor disponible en:

```text
http://localhost:3000
```

---

## 💾 Persistencia de Datos

La aplicación utiliza archivos JSON como sistema de persistencia:

* `users.json` → usuarios registrados
* `appointments.json` → turnos creados

Esta decisión permite simplificar el entorno y enfocarse en la lógica de la API y la autenticación.

---

## 🎯 Objetivo del Proyecto

Este proyecto fue desarrollado con fines educativos y de portfolio, con foco en:

* Diseño de APIs REST
* Autenticación y autorización con JWT
* Organización de proyectos backend
* Comunicación cliente-servidor
* Código claro, mantenible y escalable

---

## 🔮 Próximas Mejoras

* Manejo de errores global
* Roles de usuario
* Validaciones más avanzadas
* Base de datos (MongoDB / PostgreSQL)
* Refresh tokens
* Deploy en producción
