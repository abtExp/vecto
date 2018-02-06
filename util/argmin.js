'use strict';

const axisOps = require('./axisOps'),
    removeAxis = require('./removeAxis');
const { calcShape, flatten, arrange } = require('../lib/core');

module.exports = function(arr, axis = null) {
    const shape = arr.shape || calcShape(arr);

    arr = arr.data || flatten(arr);

    let min = [],
        opShape = [];

    if (axis === null) {
        let minIdx = 0;
        min = -Infinity;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] < min) {
                min = arr[i];
                minIdx = i;
            }
        }
        return minIdx;
    }

    let elems = axisOps(shape, axis);

    for (let i = 0; i < elems.length; i++) {
        let minElem = -Infinity,
            minIdx = 0;
        for (let j = 0; j < elems[i].length; j++) {
            if (arr[elems[i][j]] < minElem) {
                minElem = arr[elems[i][j]];
                minIdx = j;
            }
        }
        min.push(minIdx);
    }

    opShape = removeAxis(shape, axis);
    return arrange(opShape, min);
}