const flatten = require('../lib/flatten'),
    arrange = require('../lib/arrange'),
    calcShape = require('../lib/calcShape');

module.exports = function log(arr) {
    return arrange(calcShape(arr), flatten(arr).map(i => Math.log(i)));
}