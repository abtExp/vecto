const flatten = require('../lib/flatten'),
    arrange = require('../lib/transpose'),
    calcShape = require('../lib/calcShape');

module.exports = function pow(arr, p) {

    return arrange(calcShape(arr), flatten(arr).map(i => Math.pow(i, p)));
}