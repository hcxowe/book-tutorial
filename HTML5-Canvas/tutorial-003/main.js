window.onload = function() {
    if (!canvasSupport) {
        alert('your brower do not support html5 canvas!')
        return;
    }

    canvasApp();
}

function canvasSupport() {
    return !!document.createElement('canvas').getContext;
}

function canvasApp() {
    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    drawScreen(context);
}

function drawScreen(context) {
    context.fillStyle = '#ccc';
    context.fillRect(0, 0, 500, 500);

    context.strokeStyle = '#f0f';
    context.lineWidth = 2;
    context.strokeRect(0, 0, 500, 500);
    
    drawPath(context);
    drawArc(context);
    drawBesier(context);
    drawClip(context);
    drawComposite(context);
    drawTransform(context);
    drawGradient(context);
    drawRadial(context);
}

// 线段
function drawPath(context) {
    context.strokeStyle = '#fff';
    context.lineWidth = 10;
    context.lineCap = 'square';
    context.lineJoin = 'round';
    context.beginPath();
    context.moveTo(15, 15);
    context.lineTo(50, 15);
    context.lineTo(25, 50);
    context.stroke();
    context.closePath();
}

// 弧度
function drawArc(context) {
    var radian = Math.PI / 180;
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineWidth = 5;
    context.arc(80, 30, 25, radian*0, radian*135, false); // false 顺时针， true 逆时针
    context.stroke();
    context.closePath();
}

// 贝塞尔曲线
function drawBesier(context) {
    context.beginPath();
    context.strokeStyle = '#fff';
    context.lineWidth = 5;
    context.moveTo(125, 5);
    context.quadraticCurveTo(175, 50, 125, 50);
    
    context.moveTo(200, 50);
    context.bezierCurveTo(250, 0, 300, 100, 350, 50);

    context.stroke();
    context.closePath();
}

// 裁切区域
function drawClip(context) {
    context.fillStyle = 'black';
    context.fillRect(5, 105, 200, 200);
    context.save();

    context.beginPath();
    context.rect(5, 105, 50, 50);
    context.clip();

    context.beginPath();
    context.strokeStyle = 'white';
    context.lineWidth = 5;
    context.arc(105, 205, 100, Math.PI/180*0, Math.PI/180*360, false);
    context.stroke();
    context.closePath();
    
    context.restore();

    context.beginPath();
    context.rect(0, 0, 500, 500);
    context.clip();

    context.beginPath();
    context.strokeStyle = 'blue';
    context.lineWidth = 5;
    context.arc(105, 205, 100, -Math.PI/180*120, Math.PI/180*210, false);
    context.stroke();
    context.closePath();
}

// 画布上合成
function drawComposite(context) {
    context.fillStyle = '#000';
    context.fillRect(250, 100, 200, 200);

    context.fillStyle = 'red';
    context.fillRect(241, 91, 50, 50);

    context.globalAlpha = .5;

    context.globalCompositeOperation = 'source-over';
    context.fillRect(310, 91, 50, 50);

    // context.globalCompositeOperation = 'destination-atop';
    // context.fillRect(241, 150, 50, 50);

    // context.globalCompositeOperation = 'source-atop';
    // context.fillRect(310, 150, 50, 50);
}

// 旋转&缩放
function drawTransform(context) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    var angle = 45 * Math.PI / 180;
    context.translate(10 + 100 / 2, 360 + 50 / 2);
    context.rotate(angle);
    context.scale(2, 2);
    context.fillStyle = 'red';
    context.fillRect(-25, -25, 50, 50);
}

// 线性渐变填充
function drawGradient(context) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    var angle = 0 * Math.PI / 180;
    context.translate(200 + 100 / 2, 360 + 100 / 2);
    context.scale(1, 1);

    var gr = context.createLinearGradient(-50, -50, 50, -50);

    gr.addColorStop(0, '#f00');
    gr.addColorStop(.5, '#0f0');
    gr.addColorStop(1, '#00f');

    context.fillStyle = gr;
    context.fillRect(-50, -50, 100, 100);
}

// 径向渐变填充
function drawRadial(context) {
    context.setTransform(1, 0, 0, 1, 0, 0);
    var angle = 0 * Math.PI / 180;
    context.translate(350 + 100 / 2, 360 + 100 / 2);
    context.scale(1, 1);

    var gr = context.createRadialGradient(0, 0, 5, 0, 0, 50);

    gr.addColorStop(0, '#f00');
    gr.addColorStop(.5, '#0f0');
    gr.addColorStop(1, '#00f');

    context.fillStyle = gr;
    //context.fillRect(-50, -50, 100, 100);
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    context.shadowColor = 'rgb(100, 100, 100)';
    context.arc(0, 0, 50, 0, 2*Math.PI, false);
    context.fill();
}