'use strict';

/* Return shaped outputs                             ************
 *      _______   _____           _____     _____    ************
 ****  |#######| /#####\          |####\   /#####\   ************
 ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
 ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
 ****     |#|    \#####/          |####/   \#####/   ************
 ***************************************************************/

const axisOps = require('./axisOps');
const { calcShape, flatten } = require('../lib/core');

module.exports = function(arr, axis = null) {
    const shape = arr.shape || calcShape(arr);

    arr = arr.data || flatten(arr);

    let max = [];

    if (axis === null) {
        let maxIdx = 0;
        max = -Infinity;
        for (let i = 0; i < arr.length; i++) {
            if (arr[i] > max) {
                max = arr[i];
                maxIdx = i;
            }
        }
        return maxIdx;
    }

    let elems = axisOps(shape, axis);

    for (let i = 0; i < elems.length; i++) {
        let maxElem = -Infinity,
            maxIdx = 0;
        for (let j = 0; j < elems[i].length; j++) {
            if (arr[elems[i][j]] > maxElem) {
                maxElem = arr[elems[i][j]];
                maxIdx = j;
            }
        }
        max.push(maxIdx);
    }

    return max;
}