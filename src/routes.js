const express = require('express')
const ClienteController = require('./controllers/ClienteController')
const CartaoController = require('./controllers/CartaoController')

const router = express.Router()

router.get('/clientes', ClienteController.index)
router.get('/cartoes', CartaoController.index)
router.post('/clientes', ClienteController.store)

module.exports = router