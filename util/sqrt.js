module.exports = function sqrt(arr) {
    const flatten = require('../lib/flatten'),
        calc_shape = require('../lib/calc_shape'),
        arrange = require('../lib/arrange');
    return arrange(calc_shape(arr), flatten(arr).map(i => Math.sqrt(i)));
}