# 二进制数组

ArrayBuffer对象: 代表内存中的一段二进制数据，可以通过 视图 进行操作， 视图 部署了数组接口，可以用数组方法操作内存， 代表原始的二进制数据

TypeArray视图: 共包括9种类型的视图，用于读写简单类型的二进制数据

DataView视图：可以自定义复合格式的视图，用于读写复杂类型的二进制数据

## ArrayBuffer

ArrayBuffer对象代表内存中一段二进制数据，它不能直接读写，只能通过视图读写，视图的作用是以指定格式解读二进制数据

```js
var buf = new ArrayBuffer(32); // 分配一段32字节的内存区域，每个字节默认值为0

var dataView = new DataView(buf); // 创建视图

dataView.getUint8(0); // 以不带符号的8位整数格式读取第一个元素

var x1 = new Int32Array(buf);
var x2 = new Uint8Array(buf);

x1[0] = 12345;

x1; // Int32Array(8) [12345, 0, 0, 0, 0, 0, 0, 0]
x2; // Uint8Array(32) [57, 48, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]

(12345).toString(2); // "11000000111001"

0b111001; // 57
0b110000; // 48
```

### ArrayBuffer.prototype.slice()

除了slice方法，ArrayBuffer对象不提供任何直接读写内存的方法，只能在其上建立视图然后通过视图读写

```js
var buf = new ArrayBuff(16);
var buf1 = buf.slice(0, 3); // 复制buf的0-3字节的内存创建一段内存
```

### ArrayBuffer.prototype.isView()

判断参数是否为ArrayBuffer的视图实例

## TypedArray视图

ArrayBuffer对象代表的内存区域可以存放多种类型的数据，同一段内存，不同的解读方式成为 `视图`   
TypedArray视图的数组成员都是同一个数据类型   
DataView视图的数组成员可以是不同的数据类型

TypedArray视图的9中类型，每一种视图都是一种构造函数

- Int8Array
    > 8位有符号整数，1字节

- Uint8Array
    > 8位无符号整数，1字节

- Uint8ClampedArray
    > 8位无符号整数，1字节，自动过滤溢出

- Int16Array
    > 16位有符号整数， 2字节

- Uint16Array
    > 16位无符号整数， 2字节

- Int32Array
    > 32位有符号整数， 4字节

- Uint32Array
    > 32位无符号整数， 4字节

- Float32Array
    > 32位浮点数， 4字节

- Float64Array
    > 64位浮点数， 8字节

普通数组操作方法和属性对TypedArray数组完全适用， TypedArray没有concat方法

### 溢出

TypedArray数组对于溢出采用求余值方法   
正向溢出：最小值 + 余值 - 1   
负向溢出：最大值 - 余值 + 1

Uint8ClampedArray: 负向溢出都等于0，正向溢出都等于255

### TypedArray.prototype.buffer

整段内存对应的ArrayBuffer对象， 该属性只读