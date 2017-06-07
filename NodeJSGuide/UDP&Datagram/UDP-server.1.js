var dgram = require('dgram');

var server = dgram.createSocket('udp4');

server.on('listening', () => {
    // 获取地址信息
    var address = server.address();
    console.log('开始监听：%j', address);
});

server.on('message', (msg, rinfo) => {
    console.log('接收到客户端的数据: %s', msg);
    console.log('接收到客户端的地址信息: %j', rinfo);

    server.setBroadcast(true);

    var buf = new Buffer('已收到信息');
    server.send(buf, 0, buf.length, 8743, '127.0.0.255');
});

server.bind(8421, 'localhost');

