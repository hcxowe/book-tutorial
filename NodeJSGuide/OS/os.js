var os = require('os');

var osInfo = {
    tmpdir: os.tmpdir(),
    endianness: os.endianness(),
    hostname: os.hostname(),
    type: os.type(),
    platform: os.platform(),
    arch: os.arch(),
    release: os.release(),
    uptime: os.uptime(),
    loadavg: os.loadavg(),
    totalmem: os.totalmem(),
    freemem: os.freemem(),
    cpus: os.cpus(),
    networkInterfaces: os.networkInterfaces(),
    EOL: os.EOL,
    constants: os.constants,
    homedir: os.homedir(),
    userInfo: os.userInfo()
}

console.log(osInfo);