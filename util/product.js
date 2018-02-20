"use strict";

const { calcShape, flatten, arrange } = require('../lib/core'),
    matmul = require('./matmul'),
    broadcast = require('./broadcast');

module.exports = function product(arr1, arr2, mode = "dot") {
    let prod = [],
        opShape,
        broadcastable,
        s1 = arr1.shape || calcShape(arr1),
        s2 = arr2.shape || calcShape(arr2),
        ar1 = arr1.data || flatten(arr1),
        ar2 = arr2.data || flatten(arr2);

    if (mode === 'dot' && s1[s1.length - 1] === s2[0]) {
        prod = matmul(s1, s2, ar1, ar2);
        opShape = [s1[0], s2[1]];
    } else if (mode === 'elementwise') {
        [broadcastable, opShape] = broadcast(s1, s2);
        if (broadcastable) {
            // cases for product
        } else {
            throw new Error(`Shapes [${s1}] and [${s2}] can't be broadcasted.`);
        }
    }
    return arrange(opShape, prod);
}