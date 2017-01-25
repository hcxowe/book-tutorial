##变量、作用域、内存问题

### 基本类型和引用类型的值

- 基本类型值
    - 5种基本数据类型是按值访问
    - 不能为基本数据类型的变量添加属性，涉及基本数据类型对象临时创建封装对象的机制

- 引用类型值
    - 引用数据类型的值保存的是内存中的地址
    - 复制引用类型的变量操作的是对象的引用，为对象添加属性，操作的是真正的对象

- 函数的参数都是按值传递的

- 使用typeof进行基本数据类型检查

- 使用instanceof检测变量是什么类型的对象
    - a  instanceof b; 只要a的原型链上存在b则该表达式返回true

### 执行环境和作用域
    - 全局作用域、函数作用域
    - 函数嵌套构成了作用域链
    - catch、with可延长作用域链，在当前作用域前端添加一个作用域
    - IE8 cathc捕获的异常对象会被添加当前的函数作用域，IE9+已修复
    - 不存在块级作用域

### 垃圾收集

- js具有垃圾自动收集机制
- 垃圾回收机制会周期性的释放不在使用的内存
- 标记清除，现在的浏览器都使用的该清除机制
- 引用计数，早期浏览器采用了该清除机制，他有循环引用问题
- IE8-的DOM元素是c++的COM对象实现的，存在引用计数的清除机制
- IE9+把BOM和DOM对象都转换成了真正js对象
- 一旦数据不再使用，通过将其值设置为null来释放其引用

### 小结

- 基本类型值在内存中占用固定大小的空间，因此被保存在栈内存中
- 引用类型的值是对象，保存在堆内存中
- 确定基本类型使用typeof检测

