//Importaciones
const jwt = require('jsonwebtoken')
const { jwtSecret } = require('../config/config.js')

module.exports = {
    //Genera un token con una duración de 1 hora
    generateToken: (userId) => {
        return jwt.sign ({ userId}, jwtSecret, { expiresIn: '1h'})
    },
    
    // Verifica si el token es válido
    verifyToken: (token) => {
        try {
            return jwt.verify(token, jwtSecret)
        } catch (err) {
            return null
        }
    }
}