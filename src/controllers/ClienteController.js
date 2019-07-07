const mongoose = require('mongoose')
const payment = require('../services/payment')
const Cliente = mongoose.model('Cliente')

module.exports = {
  async list(req, res) {
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

      // create payment api customer card
      const { numero, expiracao_mes, expiracao_ano, cvv } = req.body.cartao
      const cartao = await payment.createCard(cliente_id, numero, nome, expiracao_mes, expiracao_ano, cvv)
      cartao["number"] = numero

      // create payment api customer subscription
      const { plano_id } = req.body.produtos[0]
      let assinatura = {}
      try {
        assinatura = await payment.createSubscription(plano_id, cliente_id, cartao)
      } catch (err) {
        return err
      }

      // persist cliente data
      const { id:cartao_id, last_four_digits, brand } = cartao
      const { id:assinatura_id, plan: { name: plano_nome }} = assinatura
      const cliente = await Cliente.create({
        cliente_id, nome, email, cartao_id, last_four_digits, brand, assinatura_id, assinatura_ativa:true, plano_id, plano_nome
      })
      
      return res.json({ cliente, cartao, assinatura }) // *** to do: marcarar numero do cartao na resposta
    } catch(err) {
      return res.json({ erro: err })
    }
    
  },

  async unsubscribe(req, res) {
    try {
      const { cliente_id } = req.params
      const { assinatura_id, _id } = await Cliente.findOne({cliente_id})
      await payment.removeSubscription(assinatura_id)
      const cliente = await Cliente.findByIdAndUpdate({_id}, req.body, { new: true })
      return res.json(cliente)
    } catch (err) {
      return `Erro ao tentar cancelar assinatura do cliente: ${err}`
    }
  }
}