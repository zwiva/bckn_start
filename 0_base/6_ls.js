const fs = require('node:fs');

// simulando un ls
fs.readdir('.', (err, files) => {
  if (err) {
    console.error('error al leer el directorio: ', err);
    return;
  }

  files.forEach(file => {
    console.log(file);
  })
})

