'use strict';

const axisOps = require('./axisOps');
const { calcShape, flatten } = require('../lib/core');

module.exports = function(arr, axis = 0) {
    const shape = arr.shape || calcShape(arr),
        elems = axisOps(shape, axis);

    console.log(elems);
    let max = [];

    arr = arr.data || flatten(arr);

    for (let i = 0; i < elems.length; i++) {
        let maxElem = -Infinity,
            maxIdx = 0;
        for (let j = 0; j < elems[i].length; j++) {
            if (arr[elems[i][j]] > maxElem)
                maxElem = arr[elems[i][j]];
            maxIdx = j;
        }
        max.push(maxIdx);
    }
    console.log(max);
}