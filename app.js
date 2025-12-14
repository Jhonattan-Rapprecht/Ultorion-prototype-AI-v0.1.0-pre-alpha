const http = require('http');
http.createServer((req, res) => {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Yo bro this is your 15th server!\n or something :)\n');
}).listen(8080);