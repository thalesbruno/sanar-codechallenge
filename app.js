const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')

const app = express()

app.use(express.json())
app.use(cors())

mongoose.connect('mongodb://localhost:27017/sanar', { useNewUrlParser: true })

require('./src/models/Cliente')
require('./src/models/Cartao')

app.use('/api', require('./src/routes'))

app.listen(3001, () => {
  console.log('Server up on port 3001')
})