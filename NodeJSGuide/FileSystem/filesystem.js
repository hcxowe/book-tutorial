var fs = require('fs');

function readFileAndConsoleSync(path) {
    var data = fs.readFileSync(path, 'utf-8');
    console.log(`readFileSync: ${path}`);
    console.log(data);
}

function readFileAndConsole(path) {
    fs.readFile(path, function(err, data) {
        console.log(`readFile: ${path}`);
        console.log(data.toString('utf-8'));
    });
}

function writeFileAndConsoleSync(path, data) {
    fs.writeFileSync(path, data);
    console.log(`${path} write success, data: ${data}`);
}

function writeFileAndConsole(path, data) {
    fs.writeFile(path, data, function(err) {
        if (!err) {
            console.log(`${path} write success, data: ${data}`);
        }
        else {
            console.log(`${path} write success, data: ${data}`);
        }
    });
}

