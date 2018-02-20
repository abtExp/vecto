/** 
 * choose : Forms a new array consisting of selected elements 
 *          ( Selects elements from a given array and forms a new array of those elements )  
 *
 * @param {Array} array - Required The array from which to choose elems.
 *          
 * @param {Array|[Array]} params - The axis wise representation of elements to pick
 *
 * 
 * @returns {Array} - The shaped array of selected elements
 * 
 */

const { calcShape, calcSize, formArr, flatten, arrange } = require('./core');
// const axisOps = require('../util/axisOps');

module.exports = function choose(array) {
    if (!params || params.length === 0) return array;

    let startIdx = 0,
        shape = array.shape || calcShape(array),
        array = array.data || flatten(array),
        elems = 1,
        retVals = [],
        opShape = [],
        numElems = [];

    // the numElems on each axis
    for (let i = shape.length - 1; i >= 0; i--) {
        numElems.push(elems * shape[i]);
    }

    // finding the starting index, can do more in it.
    for (let i = 0; i < params.length - 1; i++) {
        if (params[i] === null) i++;
        startIdx += (params[i][0] || params[i]) * numElems[i + 1];
        opShape.push((shape[i] - (params[i][1] - params[i][0])) || 1);
    }



    return arrange(opShape, retVals);
}