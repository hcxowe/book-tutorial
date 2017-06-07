var net = require('net');

console.log('%s 是否为合法IP地址: %s', '127.0.0.1', 0 == net.isIP('127.0.0.1') ? '否' : '是');


var client = new net.Socket();

client.setEncoding('utf8');

// 第一个参数为ture时，启用 keep-alive 机制， 不断向对方发送侦测包，如果对方没有响应，则认为对方已关闭连接，
// 第二个参数指定多少时间间隔发送一次侦测包, 0表示使用默认值
client.setKeepAlive(true, 0);

client.connect(8432, 'localhost', () => {
    console.log('已连接到服务器');

    client.write('hello server~!');

    console.log('当前已发送 %d 字节', client.bytesWritten);

    client.end('bye server!');

    console.log('当前已发送 %d 字节', client.bytesWritten);
});

client.on('data', (data) => {
    console.log('收到服务器发送来的数据: %s', data);
});

client.on('end', () => {
    console.log('服务器已关闭连接');
});
 
client.on('error', (err) => {
    console.log('发生错误: %s', err.code);

    client.destroy();
});