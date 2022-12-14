const express = require('express')
const mongoose = require('mongoose')

const authors = require('./routes/authors')
const books = require('./routes/books')

const port = 5000
const mongo_uri = 'mongodb://localhost:27017/mern-mvc-crud'

mongoose.connect(mongo_uri, { useNewUrlParser: true, useFindAndModify: false })
  .then(() => {
    console.log(`Conectado a la base de datos: ${mongo_uri}`)
  })
  .catch(err => {
    console.log(err)
    console.log('Terminando la aplicación ahora...')
    process.exit()
  })

const app = express()

app.use(express.json())
app.use('/api/authors', authors)
app.use('/api/books', books)

app.listen({ port }, () => {
  console.log(`Servidor listo en http://localhost:${port}`)
})