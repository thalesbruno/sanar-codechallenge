const mongoose = require('mongoose')
const Cartao = mongoose.model('Cartao')

module.exports = {
  async index(req, res) {
    try {
      const cartoes = await Cartao.find()
      return res.json(cartoes)
    } catch(err) {
      return res.json({ erro: err })
    }
  }
}