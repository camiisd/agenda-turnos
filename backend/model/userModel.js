// Importamos los modulos para trabajar con archivos y rutas
const fs = require('fs'); //archivos
const path = require('path'); //rutas

//Ruta a la base de datos de user
const filePath = path.join(__dirname, '../data/users.json')

//Función para leer la base de datos
const readUser = () => {
    const data = fs.readFileSync(filePath, 'utf-8');
    return JSON.parse(data)
}

//Función para guardar la base de datos
const saveUser = (users) => {
    fs.writeFileSync(filePath, JSON.stringify(users, null, 2))
}

//Exportar las funciones para utilizar en el Controller
module.exports = {
    readUser,
    saveUser
}