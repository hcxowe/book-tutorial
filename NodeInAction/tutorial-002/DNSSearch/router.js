/**
 * 路由模块
 */

var parseDns = require('./parse_dns.js'),
    mainIndex = require('./main_index.js');

exports.router = function(res, req, pathname) {
    switch (pathname) {
        case '/parse':
            parseDns.parseDns(res, req);
            break;
        
        default:
            mainIndex.goIndex(res, req);
    }
};