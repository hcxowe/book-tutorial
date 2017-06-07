var dgram = require('dgram');

var buff = new Buffer('hello udp server!');
var client = dgram.createSocket('udp4');
client.bind(8743, 'localhost');

client.send(buff, 0, buff.length, 8421, 'localhost', (err, bytes) => {
    if (err) {
        console.log('发送数据失败');
    }
    else {
        console.log('已发送 %d 字节数据', bytes);
    }
});

client.on('message', (msg, rinfo) => {
    console.log('已接受服务器数据: %s', msg);
    console.log('服务器地址信息: %j', rinfo);

    //client.close();
});

client.on('close', () => {
    console.log('客户端 socket 端口已关闭');
});

client.on('error', (err) => {
    console.log('向服务器发送数据失败: %s', err.code);
});

