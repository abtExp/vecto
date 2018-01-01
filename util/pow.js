module.exports = function pow(arr, p) {
    const flatten = require('../lib/flatten'),
        arrange = require('../lib/arrange'),
        calcShape = require('../lib/calcShape');

    return arrange(calcShape(arr), flatten(arr).map(i => Math.pow(i, p)));
}