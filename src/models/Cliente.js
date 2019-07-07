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
  },
  cartao_id: {
    type: String,
  },
  cartao_ultimos_quatro_digitos: {
    type: String,
    maxlength: 4
  },
  cartao_bandeira: {
    type: String
  },
  assinatura_id: {
    type: String
  },
  assinatura_ativa: {
    type: Boolean,
    default: true
  },
  plano_id: {
    type: String
  },
  plano_nome: {
    type: String
  }
}, {timestamps: true});

mongoose.model('Cliente', ClienteSchema);