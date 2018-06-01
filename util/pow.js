const flatten = require('../lib/flatten'),
    calcShape = require('../lib/calcShape');

module.exports = function pow(arr, p) {
    return arrange(calcShape(arr), flatten(arr).map(i => Math.pow(i, p)));
}