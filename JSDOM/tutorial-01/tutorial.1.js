// getElementById return Node
var title = document.getElementById('title');
//getElementByTagName  return HTMLCollection
document.getElementsByTagName('p');
// getElementByClassName  html新增方法
function getElementsByClassName(node, classname){
    if(node.getElementByClassName){
        return node.getElementsByClassName(classname);
    }
    else{
        var result = [];
        var elems = node.getElementByTagName('*');
        for(var i=0,len=elems.length; i<len; i++){
            if(elems[i].className.indexOf(classname) != -1){
                result.push(elems[i]);
            }
        }

        return result;
    }
}

console.log(title);
title.setAttribute('title', "hcxowe");
console.log(title.getAttribute('title'));
