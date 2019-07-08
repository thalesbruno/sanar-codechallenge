const mongoose = require('mongoose')
const Payment = require('../services/Payment')
const Cliente = mongoose.model('Cliente')

class ClienteController {

  async list(req, res) {
    try {
      const clientes = await Cliente.find({})
      return res.json(clientes)
    } catch(err) {
      return res.json({ erro: err })
    }
  }

  async subscribe(req, res) {
    try {
      // create Payment api customer
      const { nome, email } = req.body.cliente
      const { id:cliente_id } = await Payment.createCustomer(nome, email)

      // create Payment api customer card
      const { numero, expiracao_mes, expiracao_ano, cvv } = req.body.cartao
      const cartao = await Payment.createCard(cliente_id, numero, nome, expiracao_mes, expiracao_ano, cvv)
      cartao["number"] = numero

      // create Payment api customer subscription
      const { plano_id } = req.body.produtos[0]
      let assinatura = {}
      try {
        assinatura = await Payment.createSubscription(plano_id, cliente_id, cartao)
      } catch (err) {
        return err
      }

      // persist cliente data
      const { id:cartao_id, last_four_digits:cartao_ultimos_quatro_digitos, brand:cartao_bandeira } = cartao
      const { id:assinatura_id, plan: { name: plano_nome }} = assinatura
      const cliente = await Cliente.create({
        cliente_id, nome, email, cartao_id, cartao_ultimos_quatro_digitos, cartao_bandeira, assinatura_id, assinatura_ativa:true, plano_id, plano_nome
      })
      
      return res.json({ cliente, cartao, assinatura }) // *** to do: marcarar numero do cartao na resposta
    } catch(err) {
      return res.json({ erro: err })
    }
    
  }

  async unsubscribe(req, res) {
    try {
      const { _id } = req.params
      const { assinatura_id } = await Cliente.findById({_id})
      await Payment.removeSubscription(assinatura_id)
      const cliente = await Cliente.findByIdAndUpdate({_id}, req.body, { new: true })
      return res.json(cliente)
    } catch (err) {
      return `Erro ao tentar cancelar assinatura do cliente: ${err}`
    }
  }

  async changeCard(req, res) {
    try {
      const { _id } = req.params
      const { cliente_id } = req.body
      const { numero, nome, expiracao_mes, expiracao_ano, cvv } = req.body.cartao
      const cartao = await Payment.createCard(cliente_id, numero, nome, expiracao_mes, expiracao_ano, cvv)
      const { id:cartao_id, last_four_digits:cartao_ultimos_quatro_digitos, brand:cartao_bandeira } = cartao
      const cliente = await Cliente.findByIdAndUpdate({_id}, {cartao_id, cartao_ultimos_quatro_digitos, cartao_bandeira}, { new: true })
      const { assinatura_id } = cliente
      console.log(assinatura_id, cartao_id, numero, nome, expiracao_mes, expiracao_ano, cvv)
      const card = await Payment.updateCard(assinatura_id, cartao_id, numero, nome, expiracao_mes, expiracao_ano, cvv)
      return res.json({cliente, card})
    } catch (err) {
      return `Erro ao tentar atualizar o cartao do cliente: ${err}`
    }
  }
}

module.exports = new ClienteController()