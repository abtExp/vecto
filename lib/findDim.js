/**
 * @function findDim - find the dimensions of the ndarray
 * 
 * @param {Array} array - The array or shape of the array
 * 
 * @param {String} flag - Defines if the array or a shape is provided
 * 
 * @returns {int} the dimensions of the array
 * 
 */
module.exports = function findDim(array, flag = 'array') {
    const calcShape = require('./calcShape');
    let shape = array;
    if (flag === 'array') shape = calcShape(array);
    return shape.length;
}