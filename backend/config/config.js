//Configuración del servidor y claves sensibles
require('dotenv').config()

module.exports = {
   //Declaramos el puerto
    PORT: process.env.PORT || 3000,
    
    //Cargar las variables de entorno
    jwtSecret: process.env.JWT_SECRET || 'secret_key'
}