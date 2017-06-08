var vm = require('vm');
var util = require('util');
var e = 0;

// 独立运行js代码，不能访问任何模块中定义的变量
// vm.runInThisContext('e=e+1'); // error

// runInThisContext 独立维护一个执行上下文
vm.runInThisContext('var a = 1;');
vm.runInThisContext('a += 1; console.log(a);'); // 2


var obj = { name: 'hcxowe', age: 28 };
vm.runInNewContext('name = "nodejs"', obj);
vm.runInNewContext('age += 1', obj);
console.log(obj); // { name: 'nodejs', age: 29 }


// vm.createContext 创建上下文， runInContext 在指定上下文中执行代码
var context = vm.createContext({ x: 1});
vm.runInContext('x += 2', context);
console.log(context.x); // 3
vm.runInContext('x += 2', context);
console.log(context.x); // 5

var context2 = vm.createContext({ x: 1 });
vm.runInContext('x += 3', context2);
console.log(context2.x); // 4


var script = new vm.Script('globalVar += 1');
var context3 = vm.createContext({ globalVar: 1 });
for (let i=0; i < 100; i++) {
    script.runInContext(context3);
}
console.log(context3.globalVar);


const script1 = new vm.Script('globalVar = "set"');

const sandboxes = [{}, {}, {}];
sandboxes.forEach((sandbox) => {
  script1.runInNewContext(sandbox);
});

console.log(util.inspect(sandboxes));


global.globalVar = 0;

const script2 = new vm.Script('globalVar += 1', { filename: 'myfile.vm' });

for (let i = 0; i < 1000; ++i) {
  script2.runInThisContext();
}

console.log(globalVar);