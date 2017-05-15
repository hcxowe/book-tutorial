window.onload = function() {
    if (!canvasSupport) {
        alert('your brower do not support html5 canvas!')
        return;
    }
}

function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}