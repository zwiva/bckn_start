const fs = require('node:fs/promises');

// simulando un ls
fs.readdir('.').then(files => { // el . es buscar en donde esta
  files.forEach(file => {
    console.log(file);
  })
}).catch(err => {
  if (err) {
    console.error('error al leer el directorio: ', err);
    return;
  }

})


