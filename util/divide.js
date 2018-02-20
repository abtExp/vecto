"use strict";

const calcShape = require('../lib/calcShape'),
    arrange = require('../lib/transpose'),
    flatten = require('../lib/flatten');

function divide(arr1, arr2) {
    if (Array.isArray(arr1) && Array.isArray(arr2)) {
        if (calcShape(arr1).toString() === calcShape(arr2).toString()) {
            let t1 = flatten(arr1),
                t2 = flatten(arr2);
            for (let i = 0; i < t1.length; i++) {
                t1[i] /= t2[i];
            }
            return arrange(calcShape(arr1), t1);
        }
    } else if (Array.isArray(arr1) && !Array.isArray(arr2)) {
        let t1 = flatten(arr1);
        return arrange(calcShape(arr1), t1.map(i => i / arr2));
    } else if (!Array.isArray(arr1) && Array.isArray(arr2)) {
        let t2 = flatten(arr2);
        return arrange(calcShape(arr2), t2.map(i => arr1 / i));
    }
}
module.exports = divide;