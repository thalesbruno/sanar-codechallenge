const mongoose = require('mongoose')

const CartaoSchema = new mongoose.Schema({
  numero: {
    type: String,
    minlength: 13,
    maxlength: 19,
    required: [true, 'Não pode ficar em branco']
  },
  expiracao_mes: {
    type: Number,
    min: 1,
    max: 12,
    required: [true, 'Não pode ficar em branco']
  },
  expiracao_ano: {
    type: Number,
    match: [/\d{2}$|\d{4}/],
    required: [true, 'Não pode ficar em branco']
  },
  cvv: {
    type: String,
    minlength: 3,
    maxlength: 4
  }
})

mongoose.model('Cartao', CartaoSchema)