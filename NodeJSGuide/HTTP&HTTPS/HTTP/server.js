var http = require('http');
var fs   = require('fs');
var url  = require('url');

var server = http.createServer().listen(8763, '127.0.0.1');

server.setTimeout(60 * 1000);

server.on('listening', () => {
    console.log('开始监听: %j', server.address());

    //server.close();
});

server.on('connection', (socket) => {
    console.log('客户端连接已建立, 客户端地址信息: %j', socket.address());
});

server.on('request', (req, res) => {
    if (req.url != '/favicon.ico') {
        // var writeStream = fs.createWriteStream(__dirname + '/msg.txt', { encoding: 'utf8' });
        // writeStream.write('请求方法: ' + req.method + '\r\n');
        // writeStream.write('请求url: ' + req.url + '\r\n');
        // writeStream.write('请求头: ' + JSON.stringify(req.headers) + '\r\n');
        // writeStream.write('请求HTTP版本: ' + req.httpVersion + '\r\n');
        // writeStream.end();

        // res.end(JSON.stringify(req.headers));

        var urlobj = url.parse(req.url);

        console.log('请求url解析: %j', urlobj);

        req.on('data', (data) => {
            console.log('客户端发来的数据: %s', decodeURIComponent(data));
        });

        req.on('end', () => {
            console.log('客户端数据接受完毕');

            // 禁止自动发送 响应头信息 Data 字段
            res.sendDate = false;

            // 设置相应超时时间
            res.setTimeout(30 * 1000, () => {

            });

            res.on('timeout', () => {
                res.end('响应超时');
            });

            res.on('close', () => {

            });

            res.writeHead(200, 'success', {
                'Content-Type': 'text/plain',
                //'location': 'http://www.baidu.com',
                //'content-length': 511,
                'Set-Cookie': 'name=hcxowe',
                'Content-Encoding': 'utf8',
                //'Expiress': Date,
                'Access-Control-Allow-Origin': 'http://localhost'
            });

            // 设置单条 响应头信息 字段
            // res.serHeader('Content-Type', 'application/json'); 
            // res.removeHeader('Content-Type');

            res.write('hello hcxowe!');

            res.addTrailers({ 'Content-MD5': '323423423423423423423423' });
            
            res.end();
        });
    }
    else {
        res.end();
    }
});

server.on('timeout', (socket) => {
    console.log('服务器超时');
});

server.on('error', (err) => {
    if (err.code === 'EADDRINUSE') {
        console.log('端口被占用');
    }
    else {
        console.log('服务器发生错误: %s', err.code);
    }
});

server.on('close', () => {
    console.log('服务器已关闭');
});