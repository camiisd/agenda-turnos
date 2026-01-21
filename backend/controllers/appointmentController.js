//Importamos las funciones del Modelo
const { readAppointment, saveAppointment } = require('../model/appointmentModel')

//Importamos ZOD
const { z } = require('zod')

//GET para obtener todos los turnos
const getAppointments = (req, res) => {
    //Leemos los datos existentes de la base de datos
    const appointments = readAppointment()
    res.json(appointments)
}

//Esquema del zod
const appointmentsSchema = z.object({
  date: z.string().regex(
    /^\d{4}-\d{2}-\d{2}$/,
    "La fecha debe tener formato YYYY-MM-DD"
  ),
  time: z.string().regex(
    /^([01]\d|2[0-3]):([0-5]\d)$/,
    "La hora debe tener formato HH:mm"
  ),
  client: z.string().min(2)
});

//POST para agregar un nuevo turno
const createAppointment = (req, res) => {
    //Primero validamos los datos con ZOD
    const result = appointmentsSchema.safeParse(req.body);

  if (!result.success) {
    return res.status(400).json({ error: "Datos inválidos. La fecha debe tener formato YYYY-MM-DD. La hora debe tener formato HH:mm"});
  }
    //Luego, leemos la base de datos
    const appointments = readAppointment()

    //Creamos un objeto nuevo
    const newAppointment = {
        id: Date.now(),
        ...result.data
    }

    //Guardamos la información en la BD
    appointments.push(newAppointment)
    saveAppointment(appointments)

    //Enviamos una respuesta al cliente
    res.status(201).json( { message: 'Turno creado con éxito.', newAppointment})
}

// PUT para editar un turno existente por su ID
const updateAppointment = (req, res) => {
    //Leemos la BD
    const appointments = readAppointment()

    //Buscamos por ID
    const index = appointments.findIndex (a => a.id === parseInt(req.params.id))

    //Si el turno no está, se envía un mensaje al cliente
    if (index === -1) {
        return res.status(404).json({ message: 'Turno no encontrado.'})
    }

    //Si se encuentra el turno, comparamos la info con la BD y la combinamos
    appointments[index] = {...appointments[index], ...req.body}
    
    //Guardamos en la BD
    saveAppointment(appointments)

    //Respondemos con la info nueva
    res.json(appointments[index])
}

//DELETE para borrar un turno existente por su ID
const deleteAppointment = (req, res) => {
    //Leemos la base de datos
    const appointments = readAppointment()

    //Eliminamos con un filter
    const filteredAppointment = appointments.filter (a=> a.id !==parseInt(req.params.id))

    //Guardamos la nueva BD
    saveAppointment(filteredAppointment)

    //Enviamos un mensaje al cliente
    res.json({ message: 'El turno ha sido eliminado.'})
}

//Exportamos las funciones
module.exports = {
    getAppointments,
    createAppointment,
    updateAppointment,
    deleteAppointment
}