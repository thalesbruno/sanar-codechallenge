const mongoose = require('mongoose')
const payment = require('../services/payment')
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

  async subscribe(req, res) {
    try {
      // create payment api customer
      const { nome, email } = req.body.cliente
      const { id:cliente_id } = await payment.createCustomer(nome, email)

      // create cliente
      const cliente = await Cliente.create({cliente_id, nome, email})

      // create payment api customer card
      const { numero, expiracao_mes, expiracao_ano, cvv } = req.body.cartao
      const cartao = await payment.createCard(cliente_id, numero, nome, expiracao_mes, expiracao_ano, cvv)
      cartao["number"] = numero

      // create payment api plan
      const { plano_id } = req.body.produtos[0]
      let assinatura = {}
      try {
        assinatura = await payment.createSubscription(plano_id, cliente_id, cartao)
      } catch (err) {
        return err
      }
      
      return res.json({ cliente, cartao, assinatura }) // *** to do: marcarar numero do cartao na resposta
    } catch(err) {
      return res.json({ erro: err })
    }
    
  }
}