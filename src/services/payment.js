const axios = require('axios')

api = axios.create({
  baseURL: 'https://api.mundipagg.com/core/v1',
  headers: {
    'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
    'Content-Type': 'application/json'
  },
})

class Payment {

  async createCustomer(name, email) {
    try {
      const response = await api.post('/customers', {
        name,
        email
      })
      //console.log(response.data)
      return response.data
    } catch(err) {
      console.error('erro ao criar cliente', err)
      return err
    }
  }
  
  async createCard(customer_id, number, holder_name, exp_month, exp_year, cvv) {
    try {
      const response = await api.post(`/customers/${customer_id}/cards`, {
        number,
        holder_name,
        exp_month,
        exp_year,
        cvv
      })
      console.log(response.data)
      return response.data
    } catch(err) {
      console.error('erro ao criar cartao', err)
      return err
    }
  }

  async updateCard(subscription_id, card_id, number, holder_name, exp_month, exp_year, cvv) {
    try {
      const response = await api.patch(`/subscriptions/${subscription_id}/card`, {
        card_id,
        number,
        holder_name,
        exp_month,
        exp_year,
        cvv
      })
      console.log(response.data)
      return response.data
    } catch(err) {
      console.error(`erro ao atualizar cartao na plataforma de pagamento`)
      console.error(err)
      return err
    }
  }

  async createSubscription(plan_id, customer_id, card) {
    try {
      const response = await api.post('/subscriptions', {
        plan_id,
        payment_method: 'credit_card',
        customer_id,
        card
      })
      console.log(response.data)
      return response.data
    } catch (err) {
      console.error('Erro ao criar assinatura', err)
      return err
    }
  }

  async removeSubscription(subscription_id) {
    try {
      const response = await api.delete(`/subscriptions/${subscription_id}`)
      return response
    } catch (err) {
      return err
    }
  }

}

  module.exports = new Payment()