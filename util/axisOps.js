"use strict";

module.exports = (shape, axis) => {
    const calcSize = require('../lib/calcSize');
    let nComp = axis < shape.length - 1 ? shape[shape.length - 1] : 1,
        jumpLen = 1,
        inc = 1,
        j = 0,
        size = calcSize(shape, 'shape'),
        switches = 1,
        elems = [];
    for (let i = axis; i < shape.length; i++) {
        inc *= shape[i];
        jumpLen *= shape[i];
    }
    jumpLen /= shape[axis];
    for (let i = 0; i <= (size - jumpLen); i++) {
        let inElems = [];
        inElems.push(i);
        for (let k = 1; k < shape[axis]; k++) {
            let fact = k * jumpLen + i;
            inElems.push(fact);
            if (fact >= size) {
                return elems;
            }
        }
        elems.push(inElems);
        j++;
        if (j % nComp === 0 && axis !== 0) {
            j = 0;
            i = (inc * switches) - 1;
            switches++;
        }
    }
    return elems;
}