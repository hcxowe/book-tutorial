## Buffer

Buffer 类的实例类似于整数数组，除了其是大小固定的、且在 V8 堆外分配物理内存。 Buffer 的大小在其创建时就已确定，且不能调整大小

### Buffer.from()

#### Buffer.from(array) 

通过一个八位字节的 array 创建一个新的 Buffer

#### Buffer.from(arrayBuffer[, byteOffset[, length]])

arrayBuffer <ArrayBuffer> 一个 ArrayBuffer，或一个 TypedArray 的 .buffer 属性

当传入一个 TypedArray 实例的 .buffer 属性的引用时，这个新建的 Buffer 会像 TypedArray 那样共享同一分配的内存

#### Buffer.from(buffer)

将传入的 buffer 数据拷贝到一个新建的 Buffer 实例,  如果 buffer 不是一个 Buffer，则抛出 TypeError 错误。

#### Buffer.from(string[, encoding])

新建一个包含所给的 JavaScript 字符串 string 的 Buffer 。 encoding 参数指定 string 的字符编码

### Buffer.alloc(size[, fill[, encoding]])

size 必须小于或等于 buffer.kMaxLength 的值，否则会抛出 RangeError 错误  
如果指定了 fill ，则会调用 buf.fill(fill) 初始化分配的 Buffer   
同时指定了 fill 和 encoding ，则会调用 buf.fill(fill, encoding) 初始化分配的 Buffer

### Buffer.allocUnsafe(size) 

分配一个大小为 size 字节的新建的没有用0填充的 Buffer  
新创建的 Buffer 的内容是未知的，且可能包含敏感数据。 可以使用 buf.fill(0) 初始化 Buffer 实例为0

>注意，Buffer 模块会预分配一个大小为 Buffer.poolSize 的内部 Buffer 实例作为快速分配池， 用于使用 Buffer.allocUnsafe() 新创建的 Buffer 实例，以及废弃的 new Buffer(size) 构造器， 仅限于当 size 小于或等于 Buffer.poolSize >> 1 （Buffer.poolSize 除以2后的最大整数值）。

>对这个预分配的内部内存池的使用，是调用 Buffer.alloc(size, fill) 和 Buffer.allocUnsafe(size).fill(fill) 的关键区别。 具体地说，如果 size 小于或等于 Buffer.poolSize 的一半，则 Buffer.alloc(size, fill) 不会使用这个内部的 Buffer 池，而 Buffer.allocUnsafe(size).fill(fill) 会使用这个内部的 Buffer 池。 当应用程序需要 Buffer.allocUnsafe() 提供额外的性能时，这个细微的区别是非常重要的

### Buffer.allocUnsafeSlow(size)


### Buffer.byteLength(string[, encoding])

返回一个字符串的实际字节长度  
当 string 是一个 Buffer/DataView/TypedArray/ArrayBuffer 时，返回实际的字节长度。否则，会转换为 String 并返回字符串的字节长度

### Buffer.compare(buf1, buf2)

比较 buf1 和 buf2 ，通常用于 Buffer 实例数组的排序

### Buffer.concat(list[, totalLength])

返回一个合并了 list 中所有 Buffer 实例的新建的 Buffer

### Buffer.isBuffer(obj)

如果 obj 是一个 Buffer 则返回 true ，否则返回 false 

### Buffer.isEncoding(encoding)

如果 encoding 是一个支持的字符编码则返回 true，否则返回 false

### Buffer.poolSize

这是用于决定预分配的、内部 Buffer 实例池的大小的字节数。 这个值可以修改

### buf.compare(target[, targetStart[, targetEnd[, sourceStart[, sourceEnd]]]])

### buf.copy(target[, targetStart[, sourceStart[, sourceEnd]]])

拷贝 buf 的一个区域的数据到 target 的一个区域，即便 target 的内存区域与 buf 的重叠

### buf.entries()

从 buf 的内容中，创建并返回一个 [index, byte] 形式的迭代器

### buf.equals(otherBuffer)

如果 buf 与 otherBuffer 具有完全相同的字节，则返回 true，否则返回 false。

### buf.fill(value[, offset[, end]][, encoding])

### buf.indexOf(value[, byteOffset][, encoding])

### buf.includes(value[, byteOffset][, encoding])

### buf.keys()

### buf.lastIndexOf(value[, byteOffset][, encoding])