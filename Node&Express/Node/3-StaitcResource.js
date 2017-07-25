var http = require('http');
var fs   = require('fs');

function serveStaticFile(res, path, contentType, responseCode) {
    if (!responseCode) {
        responseCode = 200;
    }

    fs.readFile(__dirname + path, (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' });
            res.end('500 - Internal error');
        } 
        else {
            res.writeHead(responseCode, { 'Content-Type': contentType });
            res.end(data);
        }
    })
}

http.createServer((req, res) => {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();

    switch(path) {
        case '':
            serveStaticFile(res, '/public/index.html', 'text/html');
            break;
        
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html');
            break;
        
        case '/img/1.png':
            serveStaticFile(res, '/img/1.png', 'image/png');
            break;

        default:
            serveStaticFile(res, '/public/notFound.html', 'text/html', 404);
    }
}).listen(3000);