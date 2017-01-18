/**
 * DNS解析模块
 */

var querystring = require('querystring'),
    dns = require('dns');

function getDns(postData, callback) {
    var domain = querystring.parse(postData).search_dns;

    dns.resolve(domain, function(err, addresses) {
        if (!addresses) {
            addresses = ['不存在域名'];
        }

        callback(domain, addresses);
    });
}

exports.parseDns = function(res, req) {
    var postData = '';
    req.addListener('data', function(postDataChunk) {
        postData += postDataChunk;
    });

    req.addListener('end', function() {
        var retData = getDns(postData, function(domain, addresses) {
            res.writeHead(200, {'Content-Type': 'text/html'});
            res.end('<html><head><title>DNS查询结果</title></head><body><p>domian: ' + domain + '</p><p>IP: ' + addresses.join(',') + '</p></body></html>');
        });
    });
};

