const express = require('express')
const ClienteController = require('./controllers/ClienteController')

const router = express.Router()

router.get('/clientes', ClienteController.index)
router.post('/clientes', ClienteController.store)

module.exports = router