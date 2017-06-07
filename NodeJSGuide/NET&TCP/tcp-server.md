# TCP / UDP 数据通信 net / datagram

## net (网络)

### 使用net实现基于TCP的数据通信

#### 创建TCP服务器

```js
var net = require('net');
var server = net.createServer({ allowHalfOpen: false }, (socket) => {
    console.log('连接已建立');
});

server.listen(8432, 'localhost', 511, () => {
    console.log('服务器已监听');
});

// 服务器监听事件
server.on('listening', () => {
    server.address(); // 获取服务器监听的地址信息 { address: '127.0.0.1', family: 'IPv4', port: 8432 }

    server.listening; // 一个布尔值，该值指示服务器是否正在监听连接
});

// 与客户端连接事件
server.on('connection', (socket) => {
    // 获取当前与TCP服务器建立连接的客户端连接数量
    server.getConnections((err, count) => {
        console.log('当前客户端连接数量: %d', count);
    });

    // 设置可以接受的最大客户端连接数量，超过这个数量，TCP服务器不在接受连接请求
    server.maxConnections = 10;
});

//  服务器发生错误事件
server.on('error', (err) => {

});

// 服务器关闭事件
server.on('close', () => {

});
```

#### net.Socket

```js
var net = require('net');
var fs  = require('fs');
var path= require('path');

var writeStream = fs.createWriteStream(path.join(__dirname, '/test/message.txt'));
var server = net.createServer();

server.on('connection', (socket) => {
    // 获取socket对象的地址信息
    var address = socket.address(); 

    // 设置数据编码方式，影响 data 事件中接受的数据类型
    socket.setEncoding('utf8');

    // 设置连接超时时间，10s内无数据发来触发 timeout 事件，但不代表客户端不在发送数据，超时之后客户端也可在发送数据
    socket.setTimeout(10 * 1000);

    // 暂停data事件的触发，客户端发送的数据暂存在单独的缓存区
    socket.pause();

    // timeout 事件触发
    socket.on('timeout', () => {
        socket.resume();

        // pipe 将客户端发送的流数据书写到 WriteStream 中， 接受完数据后 根据 end 参数， true 结束写操作， false 不结束写操作
        socket.pipe(writeStream, { end: true });        
    });

    // 每次接受到客户端发送的流数据时触发 data 事件
    socket.on('data', (data) => {
        // 未使用socket.serEncoding()指定编码方式时，data为Buffer对象， 指定编码方式时，data为 String 对象

        socket.pause();

        // bytesRead 为socket对象接受到的数据字节数
        console.log('已经接收到: %d 字节数据', socket.bytesRead);
    });

    // 客户端连接关闭事件
    socket.on('end', () => {
        // 取消写入操作
        socket.unpipe(writeStream);
    });
});

server.listen(8765, 'localhost');
```