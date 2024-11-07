const os = require('node:os' );
console.log('info de so');

console.log('nombre', os.platform());
console.log('version', os.release());
console.log('-----------');

console.log('memoria libre', os.freemem()/1024/1024);
console.log('memoria total', os.totalmem()/1024/1024);
console.log('uptime', os.uptime()/60/60);




