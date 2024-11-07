const express = require('express')
const app = express()
const PORT = process.env.PORT ?? 1234

const mydata = require('../data/mydata.json') //agregado especial

app.disable('x-powered-by') // quitado por seguridad

// middleware -> algo que se ejecuta entre la request y la respuesta
app.use((req, res, next) => {
  // console.log('mi primer middleware');
  // trackear la request a la base de datos
  // revisar si el usuario tiene cookies
  next() // fundamental poner en middleware
})

app.use((req, res, next) => { // usable para todos los post


  if (req.method !== 'POST') return next()

  if (req.headers['content-type'] !== 'application/json') return next()

  // solo llegar request que son POST y que tienen el header Content-Type: application/json

  let body = ''

  req.on('data', chunk => {
    console.log('un chunk', chunk);
    body += chunk.toString()
  })

  req.on('end', () => {
    const data = JSON.parse(body)
    data.timestamp = Date.now()
    req.body = data
    next() // fundamental poner en middleware
  })
}) // lo mismo es con app.use(express.json())

// midleware especifico
app.use('/data/*', (req, res, next) => { // todas las que empiecen con data 
  console.log('mi primer middleware');

  next() // fundamental poner en middleware 
})

// peticiones
app.get('/', (req, res) => {
  res.end('esta es la raiz')
})

app.get('/mydata', (req, res) => {
  res.json(mydata)
})

app.post('/newdata', (req, res) => {
  // let body = ''

  // req.on('data', chunk => {
  // body += chunk.toString()
  //})

  //req.on('end', () => {
  //const data = JSON.parse(body)
  //data.timestamp = Date.now()
    res.status(201).json(data)
  //})

})

// la ultima a la que va a llegar
app.use((req, res) => { // use es como un *, para cualquiera de las acciones va a pasar lo sgte
  res.status(404).send('<h2>Caiste en un 404</h2>')
})

app.listen(PORT, () => {
  console.log(`server listening on port ${PORT}`);
})