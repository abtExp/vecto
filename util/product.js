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
            let [len, sarr, larr] = ar1.length > ar2.length ? [ar1.length, ar2, ar1] : [ar2.length, ar1, ar2],
                k = 0, switchIdx;
            for (let i = 0; i < len; i++) {
                if (k >= sarr.length) k = 0;
                prod.push(larr[i] * sarr[k++]);
            }
        } else {
            throw new Error(`Shapes [${s1}] and [${s2}] can't be broadcasted.`);
        }
    }
    return arrange(opShape, prod);
}