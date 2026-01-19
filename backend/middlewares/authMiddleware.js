const { verifyToken } = require('../services/jwtService')
const { jwtSecret } = require('../config/config.js')

//Middleware para verificar el token
function autenticationToken (req, res, next) {
    const authHeader = req.headers['authorization']
    //Extracción del token
    const token = authHeader && authHeader.split(' ') [1]

    //Condicional para verificar si hay token
    if(!token) {
        return res.status(401).json({ error: 'Token no proporcionado.'})       
    }

    const decoded = verifyToken(token)
    if (!decoded) return res.status(403).json ({ message: 'Token inválido o expirado.'})

    //Guardamos los datos en el usuario
    req.user = decoded
    next()
}

module.exports = autenticationToken
