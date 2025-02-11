const express = require('express');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const connectToDatabase = require('../models/db');
const router = express.Router();
const dotenv = require('dotenv');
const pino = require('pino'); // Importar el logger Pino

dotenv.config();
const logger = pino(); // Crear una instancia del logger Pino
const JWT_SECRET = process.env.JWT_SECRET;

// Endpoint para actualizar el perfil del usuario
router.put('/update', [
    // Validación de entradas usando express-validator
    body('name', 'El nombre es requerido').notEmpty(),
], async (req, res) => {
    // Tarea 2: Validar la entrada usando `validationResult` y devolver un mensaje apropiado si hay un error.
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        logger.error('Errores de validación en la solicitud de actualización', errors.array());
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // Tarea 3: Verificar si `email` está presente en el encabezado y lanzar un mensaje de error apropiado si no está presente.
        const email = req.headers.email;
        if (!email) {
            logger.error('Correo electrónico no encontrado en los encabezados de la solicitud');
            return res.status(400).json({ error: "Correo electrónico no encontrado en los encabezados de la solicitud" });
        }

        // Tarea 4: Conectar a MongoDB
        const db = await connectToDatabase();
        const collection = db.collection("users");

        // Tarea 5: Encontrar las credenciales del usuario en la base de datos
        const existingUser = await collection.findOne({ email });
        if (!existingUser) {
            logger.error('Usuario no encontrado');
            return res.status(404).json({ error: "Usuario no encontrado" });
        }

        // Actualizar los campos del usuario
        existingUser.firstName = req.body.name; // Actualizar el nombre
        existingUser.updatedAt = new Date(); // Actualizar la fecha de modificación

        // Tarea 6: Actualizar las credenciales del usuario en la base de datos
        const updatedUser = await collection.findOneAndUpdate(
            { email }, // Filtro para encontrar el usuario
            { $set: existingUser }, // Nuevos valores a actualizar
            { returnDocument: 'after' } // Devolver el documento actualizado
        );

        // Tarea 7: Crear autenticación JWT con user._id como carga útil utilizando la clave secreta del archivo .env
        const payload = {
            user: {
                id: updatedUser._id.toString(), // Usar el ID del usuario como carga útil
            },
        };
        const authtoken = jwt.sign(payload, JWT_SECRET); // Firmar el token JWT

        logger.info('Usuario actualizado con éxito');
        res.json({ authtoken }); // Devolver el token JWT como respuesta
    } catch (error) {
        logger.error(error);
        return res.status(500).send("Error interno del servidor");
    }
});

module.exports = router;