/**
 * 入口模块
 */

var http = require('http'),
    url  = require('url');

// 加载文件模块
var router = require('./router.js');

http.createServer(function(req, res) {
    
    var pathname = url.parse(req.url).pathname;
    
    req.setEncoding('utf-8');
    res.writeHead(200, {'Content-Type':'text/html'});
    router.router(res, req, pathname);

}).listen(1337, '127.0.0.1');

