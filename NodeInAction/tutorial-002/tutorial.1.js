/**
 * Nodejs dns search
 */

var http = require('http'),
    fs   = require('fs'),
    dns  = require('dns'),
    url  = require('url'),
    querystring = require('querystring');

/**
 * req request 请求
 * res respons 响应
 */
http.createServer(function(req, res) {
    var pathname = url.parse(req.url).pathname;
    req.setEncoding('utf-8');
    res.writeHead(200, {
        'Content-Type': 'text/html'
    });

    router(res, req, pathname);

}).listen(1337, '127.0.0.1');

console.log('Server running at http://localhost:1337/');

function router(res, req, pathname) {
    switch (pathname) {
        case '/parse': 
            parseDNS(res, req);break;
        
        default: 
            goIndex(res, req);
    }    
}

function parseDNS(res, req) {
    var postData = "";
    req.addListener('data', function(postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener('end', function() {
        var retData = getDns(postData, function(domain, addresses) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<html><head><title>DNS查询结果</title></head><body><p>domian: ' + domain + '</p><p>IP: ' + addresses.join(',') + '</p></body></html>');
        });
    });
}

function goIndex(res, req) {
    var readPath = __dirname + '/' + url.parse('index.html').pathname;
    var indexPage = fs.readFileSync(readPath);

    res.end(indexPage);
}

function getDns(postData, callback) {
    var domain = querystring.parse(postData).search_dns;

    dns.resolve(domain, function(err, addresses) {
        if (!addresses) {
            addresses = ['不存在域名'];
        }

        callback(domain, addresses);
    });
}