/* Finds the maximum between the given args
 *  
 *   function prototype :
 *          max(arg1 = [number], arg2 = [number], axis = number)
 *          @arg1 : [number] : Required, The array in which the maximum along given axis are to be found
 *        ? @arg2 : [number] : The second array, if comparing between two arrays, must be of the same shape as arg1
 *        ? @axis : number   : Number lying between the dimension of the arrays provided, The axis along which to compare
 *   Returns : [number] : The array of maximums
 */

// :construction: Under Construction :construction: \\

function max(arg1, arg2 = null, axis = 0) {
    const arrange = require('../lib/arrange'),
        calc_shape = require('../lib/calc_shape'),
        axisOps = require('./axisOps'),
        flatten = require('../lib/flatten');
    let elems = axisOps(calc_shape(arg1), axis);
    if (arg2 === null) {
        let ar = flatten(arg1),
            s = calc_shape(arg1),
            nComp = axis < s.length ? s[s.length - 1] : s[s.length - 2],
            jumpLen = 1,
            inc = 1,
            max = 0,
            switches = 1,
            maxElems = [];
        for (let i = axis; i < s.length; i++) {
            inc *= s[i];
            jumpLen *= s[i];
        }
        jumpLen /= s[axis];
        console.log(`inc : ${inc}, axis : ${axis}, jumpLen : ${jumpLen}, nComp : ${nComp}`);

        for (let i = 0; i < ar.length; i++) {
            max = ar[i];
            console.log(`i : ${i}`);
            for (let k = 0; k < s[axis]; k++) {
                let fact = k * jumpLen + i;
                console.log(`Comparing ${max} & ${ar[fact]}`);
                if (ar[fact] > max) max = ar[fact];
                if (fact >= ar.length - 1) {
                    maxElems.push(max);
                    return maxElems;
                }
            }
            maxElems.push(max);
            if (i % (nComp - 1) === 0 && i !== 0) i = (axis * inc * switches);
        }
    } else {
        if (Array.isArray(arg2) && Array.isArray(arg1)) {
            let s1 = calc_shape(arg1),
                s2 = calc_shape(arg2);
            if (s1.toString() !== s2.toString()) throw new Error(`Shapes ${s1} & ${s2} can't be compared`);
            else {
                elems = axisOps(s1);
            }
        } else if (!Array.isArray(arg2) && Array.isArray(arg1)) {
            console.log('comparing');
            ar1 = flatten(arg1);
            s1 = calc_shape(arg1);
            return arrange(s1, ar1.map(i => Math.max(i, arg2)));
        } else if (Array.isArray(arg2) && !Array.isArray(arg1)) {
            ar2 = flatten(arg2);
            s2 = calc_shape(arg2);
            return arrange(s2, ar2.map(i => Math.max(i, arg1)));
        } else {
            return Math.max(arg1, arg2);
        }
    }
}

module.exports = max;