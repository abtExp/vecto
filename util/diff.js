module.exports = function diff(arr1, arr2) {
    const { flatten, form_arr, calc_shape, arrange } = require('../lib/core');
    const { sum } = require('./math');
    if (Array.isArray(arr2)) arr2 = arrange(calc_shape(arr2), form_arr(flatten(arr2)).map(i => -i));
    else arr2 = -arr2;
    return sum(arr1, arr2);
}