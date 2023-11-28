var http = require('http');
var cd = require('./curDate');

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/html'});
  res.write("The date and time are currently: " + cd.myDateTime());
  res.end('Hello World!');
}).listen(8080);