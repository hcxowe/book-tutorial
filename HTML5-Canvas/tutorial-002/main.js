// 猜字母游戏
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
    var guesses = 0,
        message = 'Guess The Letter From a to z',
        letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'],
        today   = new Date(),
        letterToGuess  = '',
        higherOrLower = '',
        lettersGuessed,
        gameOver = false;

    var canvas = document.getElementById('canvas');
    var context = canvas.getContext('2d');

    document.getElementById('btnStart').addEventListener('click', function() {
        initGame();
    });

    document.addEventListener('keypress', onKeyup, true);
    var btn = document.getElementById('btnCreate');
    btn.addEventListener('click', createImageData);

    initGame();

    function initGame() {
        letterToGuess = letters[Math.floor(Math.random()*letters.length)];

        guesses = 0;
        lettersGuessed = [];
        gameOver = false;
        
        drawScreen();
    }

    function drawScreen() {
        context.fillStyle = '#ffa';
        context.fillRect(0, 0, 500, 300);

        context.strokeStyle = '#000';
        context.strokeRect(0, 0, 500, 300);
        context.textBaseline = 'top';

        context.fillStyle = '#000';
        context.font = '10px _sans';
        context.fillText(today, 150, 10);

        context.fillStyle = '#f00';
        context.font = '14px _sans';
        context.fillText(message, 125, 30);

        context.fillStyle = '#109910';
        context.font = '16px _sans';
        context.fillText('Guesses:' + guesses, 215, 50);

        context.fillStyle = '#000';
        context.font = '16px _sans';
        context.fillText('Higher or Lower:' + higherOrLower, 150, 125);

        context.fillStyle = '#f00';
        context.font = '16px _sans';
        context.fillText('Letters Guessed:' + lettersGuessed.toString(), 10, 260);

        if (gameOver) {
            context.fillStyle = '#f00';
            context.font = '16px _sans';
            context.fillText('you got it', 150, 180);
        }
    }

    function onKeyup(evt) {
        if (gameOver) {
            return;
        }

        var letterPressed = String.fromCharCode(evt.keyCode);
        letterPressed = letterPressed.toLowerCase();
        guesses++;
        lettersGuessed.push(letterPressed);

        if (letterPressed == letterToGuess) {
            gameOver = true;
        }
        else {
            higherOrLower = letterPressed > letterToGuess ? 'higher' : 'lower';
        }

        drawScreen();
    }

    function createImageData(evt) {
        window.open(canvas.toDataURL(), 'canvasImage', 'left=0,top=0,width=' + canvas.width + ',height=' + canvas.height + ',toolbar=0,resizable=0');
    }
}

