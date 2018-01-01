module.exports = function exp(arr) {
    const flatten = require('../lib/flatten'),
        arrange = require('../lib/arrange'),
        calcShape = require('../lib/calcShape');
    return arrange(calcShape(arr), flatten(arr).map(i => Math.exp(i)));
}