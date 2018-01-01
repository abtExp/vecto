"use strict";

module.exports =
    function product(arr1, arr2, mode = "matrix") {
        let prod = [],
            opShape;
        const calcShape = require('../lib/calcShape'),
            calcSize = require('../lib/calcSize'),
            formArr = require('../lib/formArr'),
            flatten = require('../lib/flatten'),
            matmul = require('./matmul'),
            arrange = require('../lib/arrange');

        if (mode === 'matrix') {
            let s1 = calcShape(arr1),
                s2 = calcShape(arr2),
                ar1 = flatten(arr1),
                ar2 = flatten(arr2);
            console.log(s1, s2);
            if (s1[s1.length - 1] === s2[0]) {
                prod = matmul(s1, s2, ar1, ar2);
                console.log(prod);
                opShape = [s1[0], s2[1]];
                console.log(opShape);
            }
        } else if (mode === 'dot') {
            let s1 = calcShape(arr1),
                s2 = calcShape(arr2);
            if (s1.toString() === s2.toString()) {
                let ar1 = flatten(arr1),
                    ar2 = flatten(arr2),
                    j = 0,
                    k = 0,
                    idx = ar1.length;
                opShape = s1;
                for (let i = 0; i < idx; i++) {
                    prod.push(ar1[i] * ar2[i]);
                }
            } else {
                throw new Error(`Can't apply elementwise product operation to uneven shapes ${s1} & ${s2}`);
            }
        }

        return arrange(opShape, prod);
    }