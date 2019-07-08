const express = require('express')
const clienteController = require('../controllers/ClienteController')

const router = express.Router()

router.get('/clientes', clienteController.list)
router.post('/clientes', clienteController.subscribe)
router.put('/clientes/:_id', clienteController.unsubscribe)
router.put('/clientes/:_id/cartao', clienteController.update_card)

module.exports = router