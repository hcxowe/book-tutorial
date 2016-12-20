// ##基本的测试和可访问性

// ### jshint 检测代码缺陷
// ### qunit  测试代码
// ### jsbin  在线写单页工具
// ### TDD test-driven-development 测试驱动开发
// ### BDD behavior-driven-development 行为驱动开发
// ### IE NetRenderer 在线IE各版本测试工具
// ### 跨平台测试工具 Ghositlab 、 BrowserStack
// ### 不同编码技术的性能测试： jsPref、
// ### 功能自动化测试工具——Selenium

var ary = [];
var i = 1000;

function setAry(ary) {
    while (i--) {
        ary.push["**"];
    }
}

function checkAry(ary) {
    for (var i = 0, len = ary.length; i < len; i++) {
        ary[i] += '*';
    }
}

function checkEach(ary) {
    ary.forEach(function (val, index) {
        ary[index] += '*';
    });
}

function click1() {
    setAry(ary);
}

function click2() {
    checkAry(ary);
}

function click3() {
    checkEach(ary);
}