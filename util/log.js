module.exports = function log(arr1) {
    const flatten = require('../lib/flatten'),
        arrange = require('../lib/arrange'),
        calc_shape = require('../lib/calc_shape');
    let t1 = flatten(arr1);
    return arrange(calc_shape(arr1), t1.map(i => Math.log(i)));
}