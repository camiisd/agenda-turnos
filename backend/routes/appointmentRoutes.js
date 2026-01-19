// Importamos Express y Router
const express = require('express');
const router = express.Router();

//Importamos el middleware
const autenticationToken = require('../middlewares/authMiddleware')

// Importar todas las funciones que tenemos en el controlador
const {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
} = require('../controllers/appointmentController')

//Métodos y sus endpoints
router.get('/', autenticationToken, getAppointments)
router.post('/', autenticationToken, createAppointment)
router.put('/:id', autenticationToken, updateAppointment)
router.delete('/:id', autenticationToken, deleteAppointment)

//Exportamos el enrutador
module.exports = router