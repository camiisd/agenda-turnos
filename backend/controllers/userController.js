//Importamos las funciones del Modelo y jwtService
const {readUser, saveUser} = require('../model/userModel')
const { generateToken } = require('../services/jwtService')

// Importamos el bcrypt
const bcrypt = require('bcrypt')

//Creamos funcion para normalizar los datos que ingresan
function normalizeText(text) {
    return text
        .trim()
        .toLowerCase()
        .replace(/\s+/g, ' ');
}

//POST para crear nuevos usuarios
const registerUser = async (req, res) => {
    //Desestructuramos los datos que ingresan en el cuerpo de la solicitud
    const { email, password } = req.body

    // Normalizamos el email (case insensitive)
    email = normalizeText(email);

    //Verificamos que los campos no estén vacíos
    if (!email || !password) {
        return res.status(400).json ({ error: 'No se completaron los campos requeridos.'})
    }

    //Leemos la BD para verificar si el usuario existe
    const database = readUser();
    const userExists = database.find((user) => user.mail === email);
    if (userExists) {
        return res.status(400).json({ error: "El correo electrónico ya está registrado."})
    }

    //Si el usuario no existe, hashing de la contraseña ingresada
    const hashedPassword = await bcrypt.hash(password, 10)

    //Creamos el nuevo usuario
    const newUser = { id: Date.now(), email, password: hashedPassword}

    //Guardamos el usuario en la BD
    database.push(newUser)
    saveUser(database)

    //Enviamos una respuesta al cliente
    res.status(201).json({ message: 'Usuario registrado con éxito.'})

}

//POST para iniciar sesión
const loginUser = async(req, res) => {
     //Desestructuramos los datos que ingresan en el cuerpo de la solicitud
     const { email, password } = req.body

     // Normalizamos el email (case insensitive)
    email = normalizeText(email);

     //Verificamos que los campos no estén vacíos
    if (!email || !password) {
        return res.status(400).json ({ error: 'No se completaron los campos requeridos.'})
    }

    //Leemos la BD para verificar si el usuario existe
    const database = readUser();
    const user = database.find((user) => user.email === email);
    if (!user) {
        return res.status(400).json({ error: "Usuario no encontrado."})
    }

    //Comparamos la contraseña ingresada con la hasheada
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
        return res.status(401).json ({ error: 'Los datos ingresados son incorrectos.'})
    }

    //Generamos un JWT
    const token = generateToken(user.email)

    //Enviamos un mensaje al cliente
    res.json({message: 'Inicio de sesión exitoso.', token})
}

//Exportación de las funciones
module.exports = {
    registerUser,
    loginUser,
}
