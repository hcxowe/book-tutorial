/**
 * 检索算法 - 顺序查找
 */

// 查找数组中指定元素的位置
function seqSearch(arr, data) {
    for (var i=0,len=arr.length; i < len; i++) {
        if (arr[i] == data) {
            return i;
        }
    }

    return -1;
}

// 查找最大值与最大值
function findMin(arr) {
    var min = arr[0];

    for (var i = 1, len = arr.length; i < len; i++) {
        if (min > arr[i]) {
            min = arr[i];
        }
    }

    return min;
}

// 二分查找有序数组
function binSearch(arr, data) {
    var upperBound = arr.length - 1;
    var lowerBound = 0;

    while (lowerBound <= upperBound) {
        var mid = Math.floor((upperBound + lowerBound) / 2);
        if (arr[mid] < data) {
            lowerBound = mid + 1;
        }
        else if (arr[mid] > data) {
            upperBound = mid -1;
        }
        else {
            return mid;
        }
    }

    return -1;
}