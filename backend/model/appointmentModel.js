// Importamos los modulos para trabajar con archivos y rutas
const fs = require('fs'); //archivos
const path = require('path'); //rutas

//Ruta a la base de datos
const filePath = path.join(__dirname, '../data/appointments.json')

//Función para leer la base de datos
const readAppointment = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data)
}

//Función para guardar la base de datos
const saveAppointment = (appointments) => {
    fs.writeFileSync(filePath, JSON.stringify(appointments, null, 2))
}

//Exportar las funciones para utilizar en el Controller
module.exports = {
    readAppointment,
    saveAppointment
}