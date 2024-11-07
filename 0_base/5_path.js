const path = require('node:path');

// barras espaciadoras por SO 
console.log(path.sep); // saber las barras espaciadoras del SO

// unir rutas, no se deben crear por que varian por SO las barras
const filePath = path.join('/content', 'subfolder', 'test.txt');
console.log('filepath: ', filePath);

// nombre completo del archivo
const base = path.basename('/content/subfolder/test.txt');
console.log('base: ', base);

// solo nombre articulo (sin extension)
const filename = path.basename('/content/subfolder/test.txt', '.txt');
console.log('filename: ', filename);

// extension
const extension = path.extname('/content/subfolder/test.txt', '.txt');
console.log('extension: ', extension);
