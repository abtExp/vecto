module.exports = function exp(arr1) {
    const flatten = require('../lib/flatten'),
        arrange = require('../lib/arrange'),
        calc_shape = require('../lib/calc_shape');

    let s = calc_shape(arr1),
        flat = flatten(arr1);
    return arrange(s, flat.map(i => Math.exp(i)));
}