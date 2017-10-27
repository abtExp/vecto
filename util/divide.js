"use strict";

function divide(arr1, arr2) {
    const calc_shape = require('../lib/calc_shape'),
        arrange = require('../lib/arrange'),
        flatten = require('../lib/flatten'),
        form_arr = require('../lib/form_arr');
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
        if (calc_shape(arr1).toString() === calc_shape(arr2).toString()) {
            let t1 = form_arr(flatten(arr1), 'float32'),
                t2 = form_arr(flatten(arr2), 'float32');
            for (let i = 0; i < t1.length; i++) {
                t1[i] /= t2[i];
            }
            return arrange(calc_shape(arr1), Array.from(t1));
        }
    } else if (Array.isArray(arr1) && !Array.isArray(arr2)) {
        let t1 = form_arr(flatten(arr1), 'float32');
        return arrange(calc_shape(arr1), Array.from(t1.map(i => i / arr2)));
    } else if (!Array.isArray(arr1) && Array.isArray(arr2)) {
        let t2 = form_arr(flatten(arr2), 'float32');
        return arrange(calc_shape(arr2), Array.from(t2.map(i => arr1 / i)));
    }
}
module.exports = divide;