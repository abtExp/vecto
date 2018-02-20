'use strict';

const { calcShape, fill } = require('../lib/core'),
    max = require('./max');

/**
 * 
 * @function broadcast - broadcasts the arrays to compatible shapes
 * 
 * @param {Array} s1 - First Array Shape
 * 
 * @param {Array} s2 - Second Array Shape
 * 
 * @returns {Array} - The broadcasted arrays.
 * 
 */

module.exports = function broadcast(s1, s2) {
    let [len, sarr, larr] = s1.length > s2.length ? [s1.length, s2, s1] : [s2.length, s1, s2],
        sar = fill([len], 'linear', 1), opShape, k = 0;

    for (let i = len - sarr.length; i < len; i++) {
        sar[i] = sarr[k++];
    }

    for (let i = len - 1; i >= 0; i--) {
        if (larr[i] !== sar[i]) {
            if (!(sar[i] === 1 || larr[i] === 1)) return [false, []];
        }
    }
    opShape = max({ ar1: larr, ar2: sar })
    return [true, opShape];
}