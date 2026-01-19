// Importar Express, cors, path
const express = require('express');
const path = require('path');
const cors = require('cors');

//Importamos el enrutador de User
const userRoutes = require('./routes/userRoutes')

//Importamos el enrutador de Appointment
const appointmentRoutes = require('./routes/appointmentRoutes')

//Importamos el puerto
const { PORT } = require('./config/config')

//Instanciamos Express
const app = express();

app.use(cors()); // Para que el front se pueda comunicar con el servidor en el back
app.use(express.json()); // Para la lectura de datos en formato JSON

// Para servir archivos estaticos del front
app.use(express.static(path.join(__dirname, '../public')));

// Ruta general de la API para USERS
app.use('/api/users', userRoutes)

// Ruta general de la API para APPOINTMENTS
app.use('/api/appointment', appointmentRoutes)

// Ruta para manejar cualquier otra solicitud del front
app.use((req, res) => {
    res.sendFile(path.resolve(__dirname, '..', 'public', 'index.html'));
});

//Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});