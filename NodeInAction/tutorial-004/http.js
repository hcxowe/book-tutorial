/**
 * http.js
 */

var http = require('http'),
    fs   = require('fs'),
    url  = require('url');

http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;

    console.log(url.parse(req.url));

    switch (pathname) {
        case '/index':
            resIndex(res);break;
        case '/img':
            resImage(res);break;
        
        default:
            resDefault(res);break;
    }

}).listen(1337, '127.0.0.1');

function resIndex(res) {
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);

    res.writeHead(200, {'Content-Type': 'text/html'});
    res.end(indexPage);
}

function resImage(res) {
    var readPath = __dirname + '/' + url.parse('platform.png').pathname;
    var indexPage = fs.readFileSync(readPath);

    res.writeHead(200, {'Content-Type': 'image/png'});
    res.end(indexPage);
}

function resDefault(res) {
    res.writeHead(404, {'Content-Type': 'text/plain'});
    res.end('cannot find source');
}
