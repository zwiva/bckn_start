// para modulos nativos que no tienen promesas nativas

const fs = require('node:fs/promises');

console.log('->leyendo el primer');

fs.readFile('./archivo.txt', 'utf-8').then(text => {
  console.log('primero: ', text);
})

console.log('estoy en el medio');
console.log('antes del segundo texto');
fs.readFile('./archivo2.txt', 'utf-8').then(secondText => {
  console.log('segundo:', secondText);
}) 