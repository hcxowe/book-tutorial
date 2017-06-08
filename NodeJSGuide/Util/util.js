var util = require('util');

// util.format
var str = util.format('%s + %d%% + %j', 'hcxowe', '12', { x: 1, y: 2 });
console.log(str);

const debuglog = util.debuglog('debug');
debuglog('hello from debug [%d]', 345);



