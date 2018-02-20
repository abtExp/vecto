const flatten = require('../lib/flatten'),
    arrange = require('../lib/transpose'),
    calcShape = require('../lib/calcShape');

module.exports = function exp(arr) {
    return arrange(calcShape(arr), flatten(arr).map(i => Math.exp(i)));
}