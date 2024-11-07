const fs = require('node:fs'); // forma recomendada de pedir un modulo nativo
console.log('file system');

const stats = fs.statSync('./archivo.txt');

console.log('isFile', stats.isFile());
console.log('isDirectory', stats.isDirectory());
console.log('isSymbolicLink', stats.isSymbolicLink());
console.log('size', stats.size);
console.log('-----------');

// const text = fs.readFileSync('./archivo.txt', 'utf-8'); // para leer el contenido del archivo
// console.log(text);
// console.log('estoy en el medio');
// console.log('antes del segundo texto');
// const secondText = fs.readFileSync('./archivo2.txt','utf-8');
// console.log(secondText);

// asincronismo
fs.readFileSync('./archivo.txt', 'utf-8',  (err, text)=>{
  console.log(text);
});
console.log('estoy en el medio');
console.log('antes del segundo texto'); 
fs.readFileSync('./archivo2.txt','utf-8', (err, text)=>{

  console.log(secondText);
});
