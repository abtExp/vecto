/** max : finds the max elements amongst the passed arrays or a single array
 *        along an axis
 * 
 * @ar1 : [Number] , The array for finding max elems
 * 
 * @ar2 : [Number] , The second array (?Optional)
 * 
 * @axis : int , the axis along which to find the max elems
 * 
 * Returns : [Number] , the array of max elems along the given axis
 * 
 */

module.exports = function max({ ar1, ar2 = null, axis = 0 }) {
    const axisOps = require('./axisOps'),
        { flatten, arrange, calc_shape, calc_size } = require('../lib/core');
    let maxElems = [];
    if (!ar2) {
        let shape = calc_shape(ar1),
            elems = axisOps(shape, axis);
        ar1 = flatten(ar1);
        for (let i = 0; i < elems.length; i++) {
            let max = ar1[elems[i][0]];
            for (let j = 0; j < elems[i].length; j++) {
                console.log(ar1[elems[i][j]]);
                if (ar1[elems[i][j]] > max) {
                    max = ar1[elems[i][j]];
                    console.log('max is now :', max);
                }
            }
            maxElems.push(max);
        }
    } else {
        if (!Array.isArray(ar1) && Array.isArray(ar2)) {
            ar2 = flatten(ar2);
            maxElems = ar2.map(i => Math.max(ar1, i));
        } else if (Array.isArray(ar1) && !Array.isArray(ar2)) return max({ ar1: ar2, ar2: ar1 });
        else {
            if (calc_shape(ar1).toString() === calc_shape(ar2).toString()) {
                ar1 = flatten(ar1);
                ar2 = flatten(ar2);
                for (let i = 0; i < ar1.length; i++) {
                    maxElems.push(Math.max(ar1[i], ar2[i]));
                }
            } else {
                throw new Error(`Can't compare shapes ${calc_shape(ar1)} & ${calc_shape(ar2)}`);
            }
        }
    }
    return maxElems;
}