"use strict";

/* function to find the transpose */
module.exports = function transpose(arr, dtype = 'float32') {
    const { calcShape, formArr, arrange, flatten } = require('./core');
    let s = calcShape(arr),
        t = formArr(flatten(arr), dtype),
        r = s.length > 1 ? s[0] : 1,
        c = s.length > 1 ? s[1] : s[0],
        k = 0,
        b = [];
    for (let i = 0; i < c; i++) {
        for (let j = i; j < t.length; j += c) {
            b[k++] = t[j];
        }
    }
    return arrange([c, r], b);
}