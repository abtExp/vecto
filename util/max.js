const { flatten, arrange, calcShape, calcSize } = require('../lib/core'),
    axisOps = require('./axisOps');


/* Return Shaped Outputs                             ************
 *      _______   _____           _____     _____    ************
 ****  |#######| /#####\          |####\   /#####\   ************
 ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
 ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
 ****     |#|    \#####/          |####/   \#####/   ************
 ***************************************************************/

/** 
 * 
 * @function max : finds the max elements amongst the passed arrays or a single array
 *                 along an axis
 * 
 * @param {Array} ar1 - The array for finding max elems
 * 
 * @param {Array} ar2 - The second array (?Optional)
 * 
 * @param {int} axis - The axis along which to find the max elems
 * 
 * @returns {Array} - The array of max elems along the given axis
 * 
 */

module.exports = function max({ ar1, ar2 = null, axis = 0 }) {
    let maxElems = [],
        opShape = [];

    if (ar2 === null) {
        let shape = calcShape(ar1),
            elems = axisOps(shape, axis);
        ar1 = flatten(ar1);
        for (let i = 0; i < elems.length; i++) {
            let max = ar1[elems[i][0]];
            for (let j = 0; j < elems[i].length; j++) {
                max = Math.max(ar1[elems[i][j]], max);
            }
            maxElems.push(max);
        }
    } else {
        if (!Array.isArray(ar1) && Array.isArray(ar2)) {
            opShape = calcShape(ar2);
            ar2 = flatten(ar2);
            maxElems = ar2.map(i => Math.max(ar1, i));
        } else if (Array.isArray(ar1) && !Array.isArray(ar2)) return max({ ar1: ar2, ar2: ar1 });
        else {
            if (calcShape(ar1).toString() === calcShape(ar2).toString()) {
                ar1 = flatten(ar1);
                ar2 = flatten(ar2);
                for (let i = 0; i < ar1.length; i++) {
                    maxElems.push(Math.max(ar1[i], ar2[i]));
                }
                opShape = calcShape(ar2);
            } else {
                throw new Error(`Can't compare shapes ${calcShape(ar1)} & ${calcShape(ar2)}`);
            }
        }
    }
    return arrange(opShape, maxElems);
}