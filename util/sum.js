"use strict";

function sum(arr1, arr2 = null, axis = 0) {
    const { calcShape, flatten, formArr, arrange } = require('../lib/core'),
        axisOps = require('./axisOps');
    let summ, t1, t2, s1, s2;
    if (!arr2) {
        t1 = formArr(flatten(arr1));
        s1 = calcShape(arr1);
        let elems = axisOps(s1, axis);
        summ = [];
        for (let i = 0; i < elems.length; i++) {
            let sum = 0;
            for (let j = 0; j < elems[i].length; j++) {
                sum += t1[elems[i][j]];
            }
            summ.push(sum);
        }
        return summ;
    } else {
        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            t1 = formArr(flatten(arr1));
            t2 = formArr(flatten(arr2));
            s1 = calcShape(arr1);
            s2 = calcShape(arr2);
            if (s1.toString() === s2.toString()) {
                summ = [];
                for (let i = 0; i < t1.length; i++) {
                    summ[i] = t1[i] + t2[i];
                }
                return arrange(s1, summ);
            } else if (s1.length > 1 && (s2.length === 1 || (s2.length === 2 && s2[s2.length - 1] === 1))) {
                if (s1[0] === s2[0]) {
                    let j = 0;
                    summ = []
                    for (let i = 0; i < t1.length; i++) {
                        summ[i] = t1[i] + t2[j];
                        if ((i + 1) % s1[s1.length - 1] === 0 && i !== 0) j++;
                    }
                    return arrange(s1, summ);
                } else {
                    throw new Error(`Uneven shapes: arg1 is ${s1} & arg2 is ${s2}`);
                }
            } else {
                throw new Error(`Uneven shapes: arg1 is ${s1} & arg2 is ${s2}`);
            }
        } else if (Array.isArray(arr1) && !Array.isArray(arr2)) {
            t1 = formArr(flatten(arr1));
            s1 = calcShape(arr1);
            for (let i = 0; i < t1.length; i++) {
                t1[i] += arr2;
            }
            return arrange(s1, t1);
        } else if (!Array.isArray(arr1) && Array.isArray(arr2)) return sum(arr2, arr1);
    }
}
module.exports = sum;