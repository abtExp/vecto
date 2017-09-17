module.exports = (shape, axis) => {
    const calc_size = require('../lib/calc_size');
    let nComp = axis < shape.length - 1 ? shape[shape.length - 1] : 1,
        jumpLen = 1,
        inc = 1,
        j = 0,
        size = calc_size(shape, 'shape'),
        switches = 1,
        elems = [];
    console.log(axis, shape);
    for (let i = axis; i < shape.length; i++) {
        inc *= shape[i];
        jumpLen *= shape[i];
    }
    jumpLen /= shape[axis];
    console.log(`inc : ${inc}, jumpLen : ${jumpLen}`);
    console.log(size);
    for (let i = 0; i < (size - jumpLen); i++) {
        let inElems = [];
        inElems.push(i);
        for (let k = 1; k < shape[axis]; k++) {
            let fact = k * jumpLen + i;
            console.log(`comparing : ${i} & ${fact}`);
            inElems.push(fact);
            if (k >= size) {
                return elems;
            }
        }
        elems.push(inElems);
        j++;
        if (j % nComp === 0 && axis !== 0) {
            j = 0;
            i = (axis * inc * switches) - 1;
            switches++;
        }
        console.log(`i = ${i}`);
    }
    return elems;
}