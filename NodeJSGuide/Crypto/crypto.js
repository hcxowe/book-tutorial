var crypto = require('crypto');
var fs = require('fs');

// 获取crypto中所有的加密算法
var ciphers = crypto.getCiphers();
console.log('crypto中所有的加密算法：%j', ciphers);

// 获取crypto中所有的散列算法
var hashes = crypto.getHashes();
console.log('crypto中所有的散列算法：%j', hashes);

var shasum = crypto.createHash('sha1');
var readStream = fs.createReadStream(__dirname + '/crypto.js');
readStream.on('data', (data) => {
    shasum.update(data);
});

readStream.on('end', () => {
    var ret = shasum.digest('hex');

    console.log('本文件由sha1算法得到的hex散列值为：%s', ret);
});

var cipher = crypto.createCipher('blowfish', '1234567890');
cipher.update('hcxowe nodejs crypto', 'utf8');
var retCipher = cipher.final('hex');
console.log('hcxowe nodejs crypto 经过blowfish算法加密为: %s', retCipher);

var decipher = crypto.createDecipher('blowfish', '1234567890');
// decipher.update(retCipher, 'hex', 'utf8');
// var retDecipher = decipher.final('utf8');
// console.log(`${retCipher}经过blowfish算法解密为: %s`, retDecipher);
