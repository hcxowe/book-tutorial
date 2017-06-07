var http = require('http');

// http.get 方法
http.get({
    hostname: 'www.microsoft.com',
    port: 80,
    path: '/',
}, (res) => {
    
});

var req = http.request({
    hostname: 'www.microsoft.com',
    port: 80,
    path: '/',
    method: 'GET'
});

// 当建立连接过程中，为连接分配端口时触发
req.on('socket', (socket) => {
    socket.setTimeout(1000);

    socket.on('timeout', () => {
        // 终止请求
        req.abort();
    });
});

req.on('response', function(res) {
    console.log('状态码: %s', res.statusCode);
    console.log('响应头: %s', JSON.stringify(res.headers));

    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log('响应内容: %s', chunk);
    })
});

req.setTimeout(1000, () => {
    req.abort();
});

req.on('error', (err) => {
    console.log('请求发生错误: %s', err.code);
});

req.end();

