// 二维数组
Array.matrix = function(rowNum, colNum, initVal) {
    var retAry = [];
    for (var i=0; i < rowNum; i++) {
        retAry[i] = [];
        
        for (j=0; j < colNum; j++) {
            retAry[i][j] = initVal;    
        }
    }

    return retAry;
};

var ary = Array.matrix(10, 10, 1);
console.log(ary);

