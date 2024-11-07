// ejemplo como funciona por debajo express

const http = require('node:http') // inicio

const myData = require('../data/mydata.json')

const processRequest = (req, res) => { // inicio
  const { method, url } = req

  switch (method) {
    case 'GET':
      switch (url) {
        case '/data/mydata':
          res.setHeader('Content-Type', 'application/json; charset=utf-8')
          return res.end(JSON.stringify(myData))
        default:
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html; charset=utf-8')
          return res.end('<h1>404</h1>')
      }

    case 'POST':
      switch (url) {
        
        case '/uno': {
          let body = '' // let no const!!!
          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })
          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
          break
        }

        case '/newdata': {
          let body = ''
          // escuchar el evento data
          req.on('data', chunk => {
            body += chunk.toString()
          })          
          req.on('end', () => {
            const data = JSON.parse(body)
            // llamar a una base de datos para guardar la info
            res.writeHead(201, { 'Content-Type': 'application/json; charset=utf-8' })
            res.end(JSON.stringify(data))
          })
          break
        }

        case '/dos': {
          const body = ""
          break
        }
      }
  }

}

const server = http.createServer(processRequest) // inicio

server.listen(1234, () => { // inicio
  console.log('server listening on port http://localhost:1234');
})