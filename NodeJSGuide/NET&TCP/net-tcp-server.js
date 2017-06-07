var net = require('net');
var fs  = require('fs');
var path = require('path');

var writeStream = fs.createWriteStream(path.join(__dirname, '/test/message.txt'));

var server = net.createServer( (socket) => {
    console.log('连接已建立');

    server.getConnections( (err, count) => {
        console.log('当前连接个数: %d', count);
        server.maxConnections = 4;

        server.close();
    });
});

server.listen(8432, 'localhost', () => {
    console.log('服务器已开始监听');

    // 获取服务器所监听的地址信息
    var address = server.address();
    console.log(address);
});

server.on('connection', (socket) => {
    // var content = "";
    // socket.setEncoding('utf8');
    // socket.on('data', (data) => {
    //     content += data.toString();
    // });


    // 加入{ end: false }, socket在没有新的数据时，将不会立即结束写操作，可以手动结束写操作
    // socket.pipe(writeStream, { end: false });

    // socket.on('end', () => {
    //     writeStream.end('end');
    //     console.log('连接已断开, 收到的内容为: %s', content);
    // });


    // 设置与客服端连接的超时时间
    socket.setTimeout(5000);
    
    // 暂停触发data事件，将传输数据缓存起来
    socket.pause();

    // 监听客户端连接超时
    socket.on('timeout', () => {
        // 恢复，读取被缓存的数据
        socket.resume();

        // 将数据写入到文件
        socket.pipe(writeStream);

        socket.setEncoding('utf8');
        socket.write('hello client');
    });

    socket.on('data', (data) => {
        socket.pause();
    });
});

server.on('close', () => {
    console.log('服务器关闭');
});

server.on('error', (err) => {
    if (e.code == 'EADDRINUSE') {
        console.log('地址端口已被占用')
    }
});