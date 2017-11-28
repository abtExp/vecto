/** min : finds the min elements amongst the passed arrays or a single array
 *        along an axis
 * 
 * @ar1 : [Number] , The array for finding min elems
 * 
 * @ar2 : [Number] , The second array (?Optional)
 * 
 * @axis : int , the axis along which to find the min elems
 * 
 * Returns : [Number] , the array of min elems along the given axis
 * 
 */

module.exports = function min({ ar1, ar2 = null, axis = 0 }) {
    const axisOps = require('./axisOps'),
        { flatten, calc_shape } = require('../lib/core');
    let minElems = [];
    if (ar2 === null) {
        let shape = calc_shape(ar1),
            elems = axisOps(shape, axis);
        ar1 = flatten(ar1);
        for (let i = 0; i < elems.length; i++) {
            let min = ar1[elems[i][0]];
            for (let j = 0; j < elems[i].length; j++) {
                console.log(ar1[elems[i][j]]);
                if (ar1[elems[i][j]] < min) {
                    min = ar1[elems[i][j]];
                    console.log('min is now :', min);
                }
            }
            minElems.push(min);
        }
        return minElems;
    } else {
        if (!Array.isArray(ar1) && Array.isArray(ar2)) {
            ar2 = flatten(ar2);
            minElems = ar2.map(i => Math.min(i, ar1));
            return minElems;
        } else if (Array.isArray(ar1) && !Array.isArray(ar2)) return min({ ar1: ar2, ar2: ar1 });
        else {
            if (calc_shape(ar1).toString() === calc_shape(ar2).toString()) {
                ar1 = flatten(ar1);
                ar2 = flatten(ar2);
                for (let i = 0; i < ar1.length; i++) {
                    minElems.push(Math.min(ar1[i], ar2[i]));
                }
                return minElems;
            } else {
                throw new Error(`Can't compare shapes ${calc_shape(ar1)} & ${calc_shape(ar2)}`);
            }
        }
    }
}