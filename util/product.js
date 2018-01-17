"use strict";

module.exports =
    function product(arr1, arr2, mode = "matrix") {
        const { calcShape, flatten, matmul, arrange } = require('../lib/core');
        let prod = [],
            opShape,
            s1 = calcShape(arr1),
            s2 = calcShape(arr2),
            ar1 = flatten(arr1),
            ar2 = flatten(arr2);

        if (mode === 'matrix') {
            if (s1[s1.length - 1] === s2[0]) {
                prod = matmul(s1, s2, ar1, ar2);
                opShape = [s1[0], s2[1]];
            }
        } else if (mode === 'dot') {
            if (s1.toString() === s2.toString()) {
                let j = 0,
                    k = 0,
                    idx = ar1.length;
                opShape = s1;
                for (let i = 0; i < idx; i++) {
                    prod.push(ar1[i] * ar2[i]);
                }
            } else if (condn) {
                // broadcasting
            } else {
                throw new Error(`Can't apply elementwise product operation to uneven shapes ${s1} & ${s2}`);
            }
        }

        return arrange(opShape, prod);
    }