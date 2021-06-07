const express = require('express');
const { dbConnection } = require('./database/config');
const cors = require('cors')
require('dotenv').config();

const auth = require('./routes/auth')

// Crear servidor de express
const app = express();

// Base de datos
dbConnection()

// CORS
app.use(cors())

// Directorio público
app.use(express.static('public'));

// Lectura y parseo del body
app.use(express.json());

// Rutas
app.use('/api/auth', auth);
app.use('/api/books', require('./routes/books'));

// Escuchar peticiones
app.listen(process.env.PORT, () => {
    console.log(`Servidor corriendo en puerto ${process.env.PORT}`);
});
