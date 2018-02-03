const { flatten, formArr, calcShape, arrange } = require('../lib/core');
const { sum } = require('./math');

module.exports = function diff(arr1, arr2) {
    if (Array.isArray(arr2)) arr2 = arrange(calcShape(arr2), formArr(flatten(arr2)).map(i => -i));
    else arr2 = -arr2;
    return sum(arr1, arr2);
}