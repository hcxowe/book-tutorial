var http = require('http');

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    res.write('<!DOCTYPE html><html><head><meta charset="UTF-8" /></head><body>Hello World!</body></html>');
    res.end();
}).listen(1337, '127.0.0.1');

console.log('Server is running at http://127.0.0.1:1337/');