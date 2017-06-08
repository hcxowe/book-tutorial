var readline = require('readline');

var rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

rl.on('line', (line) => {
    if (line == 'exit' || line == 'quit') {
        rl.close();
    }
    else {
        console.log('你输入了:%s', line);
    }
});