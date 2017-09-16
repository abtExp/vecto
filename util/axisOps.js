module.exports = (shape, axis) => {
    const calc_size = require('../lib/calc_size');
    let nComp = axis < shape.length ? shape[shape.length - 1] : shape[shape.length - 2],
        jumpLen = 1,
        inc = 1,
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
        console.log('looping');
        let inElems = [];
        inElems.push(i);
        for (let k = 1; k < shape[axis]; k++) {
            let fact = k * jumpLen + i;
            inElems.push(fact);
        }
        elems.push(inElems);
        if (i % (nComp - 1) === 0 && i !== 0) i = (axis * inc * switches);
    }
    return elems;
}