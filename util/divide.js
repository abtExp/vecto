"use strict";

function divide(arr1, arr2) {
    const calcShape = require('../lib/calcShape'),
        arrange = require('../lib/arrange'),
        flatten = require('../lib/flatten'),
        formArr = require('../lib/formArr');
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
        if (calcShape(arr1).toString() === calcShape(arr2).toString()) {
            let t1 = formArr(flatten(arr1), 'float32'),
                t2 = formArr(flatten(arr2), 'float32');
            for (let i = 0; i < t1.length; i++) {
                t1[i] /= t2[i];
            }
            return arrange(calcShape(arr1), Array.from(t1));
        }
    } else if (Array.isArray(arr1) && !Array.isArray(arr2)) {
        let t1 = formArr(flatten(arr1), 'float32');
        return arrange(calcShape(arr1), Array.from(t1.map(i => i / arr2)));
    } else if (!Array.isArray(arr1) && Array.isArray(arr2)) {
        let t2 = formArr(flatten(arr2), 'float32');
        return arrange(calcShape(arr2), Array.from(t2.map(i => arr1 / i)));
    }
}
module.exports = divide;