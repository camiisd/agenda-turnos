// Importamos Express y Router
const express = require('express');
const router = express.Router();

// Importar todas las funciones que tenemos en el controlador
const {
    registerUser,
    loginUser
} = require('../controllers/userController')

//Métodos y sus endpoints
router.post('/register', registerUser)
router.post('/login', loginUser)

//Exportamos el enrutador
module.exports = router