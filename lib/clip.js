/**
 * @function clip : Clips the array ( converts elements according to max and min val passed )  
 *
 * @param {Array} arr : @requires
 *   
 * @param {Array|int} min_val - Optional if max_val is provided, if [number] is provided ,
 *                              then ith val in [min_val] defines a min_val for 
 *                              ith val in array.
 * 
 * @param {Array|int} max_val - Optional if min_val is provided,
 *                              same as [min_val] but defines a max_val
 * 
 * @returns {Array} the clipped array
 * 
 */

const { flatten, arrange, calcShape } = require('./core');

module.exports = function clip(arr, min_val, max_val) {
    let a = flatten(arr),
        min = [],
        max = [],
        a_shape = calcShape(arr),
        f1 = false,
        f2 = false,
        l = 0,
        k = 0;

    if (!min_val && !max_val) throw new Error('Expected atleast one clipping parameter');

    if (Array.isArray(min_val)) {
        f1 = true;
        if (calcShape(min_val).toString() === a_shape.toString()) {
            min = flatten(min_val);
        } else throw new Error(`Uneven shape : arg1 is ${a_shape}, given shape ${calcShape(min_val)}`);
    } else {
        min[0] = min_val;
    }

    if (Array.isArray(max_val)) {
        f2 = true;
        if (toString(calcShape(max_val)) === toString(a_shape)) {
            max = flatten(max_val);
        } else throw new Error(`Uneven shape : arg1 is ${a_shape}, given shape ${calcShape(min_val)}`);
    } else {
        max[0] = max_val;
    }

    for (let i = 0; i < a.length; i++) {
        a[i] = Math.max(min[k], Math.min(a[i], max[l]));
        if (f1) k++;
        if (f2) l++;
    }

    return (arrange(a_shape, a));
}
