/**
 * Nodejs hello world 
 */

var http = require('http');
var fs = require('fs');
var url = require('url');

function getFileData(callback) {
    fs.readFile('./config.conf', function(data) {
        callback(data);
    });
}

http.createServer(function(req, res) {
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    var readPath = __dirname + '/' + url.parse('config.conf').pathname;
    var data = fs.readFileSync(readPath);

    var html = '<html><head><title>测试</title></head><body><h1>Nodejs</h1><p>' + data + '</p></body></html>'
    res.end(html);

}).listen(1337, '127.0.0.1');

console.log('Server running at http://localhost:1337/');