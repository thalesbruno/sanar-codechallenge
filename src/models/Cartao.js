const mongoose = require('mongoose')

const CartaoSchema = new mongoose.Schema({
  numero: {
    
  },
  expiracao_mes: {},
  expiracao_ano: {},
  cvv: {}
})

mongoose.model('Cartao', CartaoSchema)