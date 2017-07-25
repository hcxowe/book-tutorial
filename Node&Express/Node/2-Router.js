var http = require('http');

http.createServer((req, res) => {
    console.log(req.url);
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase();
    console.log(path);

    switch(path) {
        case '':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Homepage');
            break;
        
        case '/about':
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('About');
            break;
        
        default:
            res.writeHead(200, { 'Content-Type': 'text/plain' });
            res.end('Not Found');
    }
}).listen(3000);