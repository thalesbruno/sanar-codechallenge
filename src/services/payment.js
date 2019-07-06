const axios = require('axios')

const paymentAPI = axios.create({
  baseURL: 'https://api.mundipagg.com/core/v1',
  headers: {
    'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
    'Content-Type': 'application/json'
  },
})

module.exports = {
  async createCustomer(name, email) {
    try {
      const response = await paymentAPI.post('/customers', {
        name,
        email
      })
      //console.log(response.data)
      return response.data
    } catch(err) {
      console.error(err)
      return err
    }
  },
  
  async createCard(customer_id, number, holder_name, exp_month, exp_year, cvv) {
    try {
      const response = await paymentAPI.post(`/customers/${customer_id}/cards`, {
        number,
        holder_name,
        exp_month,
        exp_year,
        cvv
      })
      console.log(response.data)
      return response.data
    } catch(err) {
      console.error(err)
      return err
    }
  }
}