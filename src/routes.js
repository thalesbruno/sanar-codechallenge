const express = require('express')
const clienteController = require('./controllers/clienteController')

const router = express.Router()

router.get('/clientes', clienteController.index)
router.post('/clientes', clienteController.subscribe)

module.exports = router