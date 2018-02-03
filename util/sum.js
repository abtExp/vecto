"use strict";

/**
 * 
 * @function sum - adds two ndarrays
 * 
 * @param {Array} arr1 - The first array
 * 
 * @param {Array} arr2 - The second array
 * 
 * @param {int} axis - The axis along which to add.
 * 
 * @returns {Array} - The resultant
 * 
 */

const { calcShape, flatten, formArr, arrange } = require('../lib/core'),
    broadcast = require('./broadcast'),
    axisOps = require('./axisOps');

function sum(arr1, arr2 = null, axis = 0) {
    let ar1 = flatten(arr1),
        ar2 = arr2 !== null ? flatten(arr2) : null,
        s1 = calcShape(arr1),
        s2 = ar2 ? calcShape(arr2) : null,
        broadcastable,
        summ = [],
        opShape;

    if (!arr2) {
        let elems = axisOps(s1, axis);
        for (let i = 0; i < elems.length; i++) {
            let sum = 0;
            for (let j = 0; j < elems[i].length; j++) {
                sum += ar1[elems[i][j]];
            }
            summ.push(sum);
        }
        return summ;
    } else {
        [broadcastable, opShape] = broadcast(s1, s2)
        if (broadcastable) {
            // cases for sum
        } else {
            throw new Error(`Shapes [${s1}] and [${s2}] can't be broadcasted.`);
        }
    }
    return arrange(opShape, summ);
}
module.exports = sum;