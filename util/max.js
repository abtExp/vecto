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

function max(arg1, arg2, axis = 0) {
    const arrange = require('../lib/arrange'),
        calc_shape = require('../lib/calc_shape'),
        flatten = require('../lib/flatten');
    if (!arg2) {
        let ar = flatten(arg1),
            s = calc_shape(arg1),
            nComp = axis < s.length ? s[s.length - 1] : s[s.length - 2],
            jumpLen = 1,
            inc = 1,
            max = 0,
            maxElems = [];
        for (let i = axis; i < s.lenght; i++) {
            inx *= s[i];
            jumpLen *= s[i];
        }
        jumpLen /= s[axis];

        for (let i = 0; i < ar.length; i++) {
            max = ar[i];
            for (let k = 0; k < s[axis]; k++) {
                let fact = k * jumpLen + i;
                if (ar[fact] > max) max = ar[fact];
                if (fact === ar.length - 1) i = k;
            }
            maxElems.push(max);
            if (i % (nComp - 1) === 0 && i !== 0) i += axis * inc;
        }
        return maxElems;
    }
}
// else if(Array.isArray(arg1) && Array.isArray(arg2)){

// }

module.exports = max;