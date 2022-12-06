const fs = require('fs').promises

// fs.readFile('./file.txt', 'utf-8').then(data => console.log(JSON.parse(data)))
// fs.readFile('./file.txt').then(data => console.log(data))

// fs.writeFile('./file.txt', 'new').then(() => console.log('Done'))
fs.appendFile('./file.txt', 'append file test\n')


