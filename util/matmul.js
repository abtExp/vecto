"use strict";

const formArr = require('../lib/formArr');
ar1 = formArr(ar1, dtype);
ar2 = formArr(ar2, dtype);

// Broken for inner dimension = 1;

// Matrix multiplication
module.exports = (s1, s2, ar1, ar2, dtype = 'float32') => {
    let r1 = s1[0],
        c1 = s1[1],
        r2 = s2[0],
        c2 = s2[1],
        k = 0,
        l = 0,
        m = 0,
        cnt = 0,
        sum = 0,
        prod = [];
    for (let i = 0; m < r1; i++, k++) {
        let j = c2 * k + cnt;
        sum += ar1[i] * ar2[j];
        if ((i + 1) % (c1) === 0 && i != 0) {
            k = -1;
            prod.push(sum);
            sum = 0;
            if (cnt < c2 - 1) {
                cnt++;
                i = l;
                i--;
            } else {
                cnt = 0;
                m++;
                l = c1 * m;
            }
        }
    }
    return prod;
}