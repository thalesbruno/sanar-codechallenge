const axios = require('axios')

const paymentAPI = axios.create({
  baseURL: 'https://api.mundipagg.com/core/v1',
  headers: {
    'Authorization': 'Basic ' + new Buffer("sk_test_RYwm6wBcMjt387nb:").toString('base64'),
    'Content-Type': 'application/json'
  },
})

const getCustomer = async (id) => {
  try {
    const response = await paymentAPI.get(`/customers/${id}`)
    console.log(response.data)
  } catch (err) {
    console.error(err)
  }
}

getCustomer('cus_l6egDznCOgUQDRAY')