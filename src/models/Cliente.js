const mongoose = require('mongoose')

const ClienteSchema = new mongoose.Schema({
  cliente_id: {
    type: String,
    required: [true, 'Não pode ficar em branco']
  },
  nome: {
    type: String,
    required: [true, 'Não pode ficar em branco']
  },
  email: {
    type: String,
    lowercase: true,
    required: [true, 'Não pode ficar em branco'],
    match: [/\S+@\S+\.\S+/, 'e-mail inválido']
  }
}, {timestamps: true})

mongoose.model('Cliente', ClienteSchema)