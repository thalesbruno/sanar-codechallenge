const express = require('express')
const ClienteController = require('../controllers/ClienteController')

const router = express.Router()

router.get('/clientes', ClienteController.list)
router.post('/clientes', ClienteController.subscribe)
router.put('/clientes/:_id', ClienteController.unsubscribe)
router.put('/clientes/:_id/cartao', ClienteController.changeCard)

module.exports = router