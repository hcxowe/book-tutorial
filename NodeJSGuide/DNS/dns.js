var dns = require('dns');

dns.resolve('www.baidu.com', 'A', (err, ret) => {
    console.log(ret);
});

dns.lookup('www.baidu.com', 4, (err, address) => {
    console.log(address);
});

dns.reverse('163.177.151.109', (err, domain) => {
    console.log(domain);
});