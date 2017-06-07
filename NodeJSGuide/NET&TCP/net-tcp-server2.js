var net = require('net');

var server = net.createServer({ allowHalfOpen: false });

server.on('connection', (socket) => {
    console.log('客户端与服务器已经连接');

    socket.setEncoding('utf8');

    server.getConnections((err, count) => {
        if (count > 2) {
            server.close();
        }
    });

    socket.on('data', (data) => {
        console.log('接受到客户端数据: %s', data);

        socket.write('hello client~!');

        console.log('当前已发送 %d 字节', socket.bytesWritten);

        socket.end('bye clent!');

        console.log('当前已发送 %d 字节', socket.bytesWritten);

        console.log('当前缓存了 %d 字符', socket.bufferSize);
    });

    socket.on('error', (err) => {
        console.log('发生错误: %s', err.code);    

        socket.destroy();
    });

    socket.on('end', () => {
        console.log('客户端已关闭连接');

        // 客户端连接全部关闭时退出应用程序
        server.unref();

        // 阻止应用程序的退出
        server.ref();
    });

    // 当socket被彻底关闭的时候触发，hasError表示端口被关闭是由错误引起还是正常的关闭
    socket.on('close', (hasError) => {
        if (hasError) {
            console.log('由一个错误导致socket端口被关闭');
            server.unref();
        }
        else {
            console.log('socket端口正常关闭');
        }
    });

    socket.on('drain', () => {
        console.log('TCP缓存去数据已全部发送');
    })

});

server.on('error', (err) => {
    console.log('发生错误: %s', err.code);
});

server.on('close', () => {
    console.log('TCP服务器被关闭');
});

server.listen(8432, 'localhost');