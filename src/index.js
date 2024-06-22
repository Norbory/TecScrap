const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')

// middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))

// Configurar CORS para permitir todas las solicitudes
app.use(cors())

module.exports = app