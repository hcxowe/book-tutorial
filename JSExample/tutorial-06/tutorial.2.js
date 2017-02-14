 /*
组合主要用到了循环加递归的方式 实现的，个人觉得很是精辟，
举例来说吧choose([1,2,3,4,5,6], 3)
第一次循环的时候 arr是[1,2,3,4,5,6],size=3,result=[],
经过一次递归后的结果是什么样的了?递归里面也有循环递归
经过第一次循环第一次递归变为arr=[3,4,5,6],size=1,result=[1,2],所以结果就出来了[1,2,3][1,2,4][1,2,5][1,2,6]
那么第一次循环第二次递归arr=[4,5,6],size=1,result=[1,3],所以结果就出来了[1,3,4][1,3,5][1,3,6]
那么第一次循环第三次递归arr=[5,6],size=1,result=[1,4],所以结果就出来了[1,4,5][1,4,6]
那么第一次循环第四次递归arr=[6],size=1,result=[1,5],所以结果就出来了[1,5,6]
那么第二次循环第一次递归变为arr=[4,5,6],size=1,result=[2,3],所以结果就出来了[2,3,4][2,3,5][2,3,6]
*/
function choose(arr, size) {
    var allResult = [];
    (function (arr, size, result) {
        var arrLen = arr.length;
        if (size > arrLen) {
            return;
        }
        if (size == arrLen) {
            allResult.push([].concat(result, arr))
        } else {
            for (var i = 0 ; i < arrLen; i++) {
                var newResult = [].concat(result);
                newResult.push(arr[i]);

                if (size == 1) {
                    allResult.push(newResult);
                } else {
                    var newArr = [].concat(arr);
                    newArr.splice(0, i + 1);
                    arguments.callee(newArr, size - 1, newResult);
                }
            }
        }
    })(arr, size, []);
    return allResult;
}

/*
这里的排列和组合一样 也是运用循环和递归的思想，比如arr=[1,2,3] ,size=3
第一次循环curItem=1 第一次递归newArr=3,result=[1,2] 所以结果是[1,2,3]
第一次循环curItem=1 第二次递归newArr=2,result=[1,3] 所以结果是[1,3,2]
第二次循环curItem=2 第一次递归newArr=3,result=[2,1] 所以结果是[2,1,3]
第二次循环curItem=2 第二次递归newArr=1,result=[2,3] 所以结果是[2,3,1]
*/
function queue(arr, size) {
    if (size > arr.length) { return; }
    var allResult = [];

    (function (arr, size, result) {
        if (result.length == size) {
            allResult.push(result);
        } else {
            for (var i = 0, len = arr.length; i < len; i++) {
                var newArr = [].concat(arr),
                    curItem = newArr.splice(i, 1);
                arguments.callee(newArr, size, [].concat(result, curItem));
            }
        }
    })(arr, size, []);

    return allResult;
}