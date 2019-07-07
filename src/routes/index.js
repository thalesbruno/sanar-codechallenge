const express = require('express')
const clienteController = require('../controllers/ClienteController')

const router = express.Router()

router.get('/clientes', clienteController.list)
router.post('/clientes', clienteController.subscribe)
router.put('/clientes/:cliente_id', clienteController.unsubscribe)

module.exports = router