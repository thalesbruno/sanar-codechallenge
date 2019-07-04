const mongoose = require('mongoose')
const Cliente = mongoose.model('Cliente')

module.exports = {
  async index(req, res) {
    try {
      const clientes = await Cliente.find({}, {_id: 0, nome: 1, email: 1})
      return res.json(clientes)
    } catch(err) {
      return res.json({ erro: err })
    }
  },
  async store(req, res) {
    try {
      const cliente = await Cliente.create(req.body)
      return res.json(cliente)
    } catch(err) {
      return res.json({ erro: err.message })
    }
    
  }
}