const http = require('node:http')

const server = http.createServer((req, res) => {
  console.log('request received');
  res.end("Hola mundo")
})

server.listen(0, () => { // truco para ir al primer puerto disponible
  console.log(`server listening on port http://localhost:${server.address().port}`);
})

