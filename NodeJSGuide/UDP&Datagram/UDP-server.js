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

    // 设置 TTL （time to alive），数据包被废弃前，最多经过路由器的最大数目
    server.setTTL(128);

    var buf = new Buffer('已收到信息');
    server.send(buf, 0, buf.length, rinfo.port, rinfo.address);

    // 10s 后 如果没有客户端连接时允许UDP服务器应用程序被正常退出
    serTimeout(() => {
        server.unref();
    }, 10000);
});

server.bind(8421, 'localhost');

