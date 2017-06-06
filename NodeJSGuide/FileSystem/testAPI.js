var fs = require('fs');
var path = require('path');

// 改写文件的读写权限
fs.chmod(path.join(__dirname, '/test/1.txt'), 666, (err) => {
    console.log(err);
    console.log(err ? '修改文件读写权限失败' : '修改文件读写权限成功');
});

// 打开文件   flags：ｒ, r+, rs+, w, wx, w+, wx+, a, ax, a+, ax+
fs.open(path.join(__dirname, '/test/1.txt'), 'r+', (err, fd) => {
    fs.close(fd);
});

// 从 fd 指定的文件中获取数据
// fs.read(fd, buffer, offset, length, position, (err, bytesRead, buffer) => {})

// 异步或一个文件的全部内容
fs.readFile(path.join(__dirname, '/test/1.txt'), {encoding: 'utf8', flag: 'r'}, (err, data) => {
    console.log(`readFile获取的数据: ${data}`);
});

// 读取一个目录的内容
fs.readdir(path.join(__dirname, '/test'), (err, files) => {
    console.log(`获取目录内容: ${files}`);
});

// 读取文件或目录的链路径
fs.readlink(path.join(__dirname, '/test/1.txt'), (err, linkString) => {
    console.log(`readlink读取的链路径: ${linkString}`);
})


// 测试 指定的文件或目录 的用户权限 
fs.access(__dirname + '/test/1.txt', fs.constants.F_OK | fs.constants.R_OK | fs.constants.W_OK /*| fs.constants.X_OK*/, (err) => {
    // 检查 1.txt 文件 是否 对调用进程可见（F_OK）| 可被调用进程读取（R_OK）| 可被调用进程写入（W_OK）| 可被调用进程执行（X_OK）
    console.log(err);
    console.log(err ? '不满足指定的用户权限' : '满足指定的用户权限');
});

// 追加数据到一个文件，如果文件不存在则创建文件
fs.appendFile(path.join(__dirname, '/test/1.txt'), 'appendFile', {encoding: 'utf8', mode: 0o666, flag: 'a'}, (err) => {
    console.log(err);
    console.log(err ? '追加数据失败' : '追加数据成功');
});

// 新建 ReadStream 对象
var readStream = fs.createReadStream(path.join(__dirname, '/test/1.txt'), {
    flags: 'r',
    encoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true,
    start: 0,
    end: 10
});
readStream.on('open', (fd) => {
    console.log('开始读取文件');
})
readStream.on('data', (data) => {
    console.log(`读取数据: ${data}`);
});
readStream.on('end', () => {
    console.log('文件读取完毕');
});
readStream.on('close', () => {
    console.log('文件被关闭');
});
readStream.on('error', (err) => {
    console.log(`读取文件发生错误: ${err}`);
});

// 新建 WriteStream 对象
var writeStream = fs.createWriteStream(path.join(__dirname, '/test/1.txt'), {
    flags: 'r+',
    defaultEncoding: 'utf8',
    fd: null,
    mode: 0o666,
    autoClose: true,
    start: 8
});
writeStream.write('write something!\n');

// fs.fchmod

// fs.fchown

// fs.fdatasync

// fs.fstat

// fs.fsync

// fs.lchmod(path, mode, callback)

// fs.lchown(path, uid, gid, callback)

// 如果文件描述符指向的文件大于 len 个字节，则只有前面 len 个字节会保留在文件中
var fd = fs.openSync(path.join(__dirname, '/test/1.txt'), 'r+');
fs.ftruncate(fd, 10, (err) => {
    console.log(fs.readFileSync(path.join(__dirname, '/test/1.txt'), 'utf8'));
});

// fs.futimes(fd, atime, mtime, callback)  改变由所提供的文件描述符所指向的文件的文件时间戳

// fs.link(existingPath, newPath, callback)

// fs.lstat(path, callback)

// fs.mkdir(path[, mode], callback)

// 创建一个唯一的临时目录
var sep = path.sep;
var tmpDir = __dirname + '/test';
fs.mkdtemp(`${tmpDir}${sep}`, (err, folder) => {
  if (err) {
      throw err;
  }

  console.log(folder);
  // 会输出类似于 `/tmp/abc123`。
  // 一个新的临时目录会被创建在 /tmp 目录里。
});


// fs.realpath(path[, options], callback)

// fs.rename(oldPath, newPath, callback)

// fs.rmdir(path, callback)

fs.stat(path.join(__dirname, '/test/1.txt'), (err, stats) => {
    console.log('stat:');
    console.log(stats);
});

// 创建了一个名为 "new-port" 且指向 "foo" 的符号链接
fs.symlink(path.join(__dirname, '/test'), path.join(__dirname, '/new-test'), () => {
    fs.stat(path.join(__dirname, '/test'), (err, stats) => {
        console.log('stat /test: ');
        console.log(stats);
    });
});

// fs.unlink(path, callback)

// fs.truncate(path, len, callback)

// fs.unwatchFile(filename[, listener])

// fs.utimes(path, atime, mtime, callback)  改变指定的路径所指向的文件的文件时间戳

// fs.watch(filename[, options][, listener]) 监视 filename 的变化，filename 可以是一个文件或一个目录。 返回的对象是一个 fs.FSWatcher

// fs.watchFile(filename[, options], listener) 监视 filename 的变化。 回调 listener 会在每次访问文件时被调用

// fs.write(fd, buffer[, offset[, length[, position]]], callback)

// fs.write(fd, string[, position[, encoding]], callback)

// fs.writeFile(file, data[, options], callback) 异步地写入数据到文件，如果文件已经存在，则替代文件

// fs 常量  常量由 fs.constants 输出