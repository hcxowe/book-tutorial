const buf1 = Buffer.alloc(10, 0); console.log(buf1);   // 默认以0初始化buffer

const buf2 = Buffer.allocUnsafe(10);console.log(buf2); // 不初始化分配buffer，速度快
buf2.fill(0);  console.log(buf2); // 必须对allocUnsafe分配的内存进行初始化

const buf3 = Buffer.from('buffer'); console.log(buf3);

const buf4 = Buffer.from([1,2,3,4]); console.log(buf4);

const buf5 = Buffer.from('hello world', 'ascii'); 
console.log(buf5.toString('hex'));
console.log(buf5.toString('base64'));

