module.exports = function sqrt(arr) {
    const flatten = require('../lib/flatten'),
        calcShape = require('../lib/calcShape'),
        arrange = require('../lib/arrange');
    return arrange(calcShape(arr), flatten(arr).map(i => Math.sqrt(i)));
}