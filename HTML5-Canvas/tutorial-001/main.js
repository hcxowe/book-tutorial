window.onload = function() {
    canvasApp();
}

function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}

function canvasApp() {
    if (!canvasSupport()) {
        alert('your brower do not support html5 canvas!')
        return;
    }

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    drawScreen(context);
}

function drawScreen(context) {

    context.fillStyle = '#ffa';
    context.fillRect(0, 0, 500, 300);

    context.fillStyle = '#000';
    context.font = '20px _sans';
    context.textBaseline = 'top';
    context.fillText('Hello Canvas!', 0, 0);

    var image = new Image();
    image.src = '../images/10.gif';
    image.onload = function() {
        context.drawImage(image, 50, 50);
    }

    context.strokeStyle = '#000';
    context.strokeRect(0, 0, 500, 300);
}