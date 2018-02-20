/**
 * @function calcSize - Calculate the size of the ndarray
 * 
 * @param {Array} array - Either the ndarray or the shape of array
 * 
 * @param {String} flag - Defining either array or shape is being passed
 * 
 * @returns {int} The size of the array
 *   
 */
module.exports = function calcSize(array, flag = 'array') {
    const calcShape = require('./calcShape');
    let shape = flag === 'array' ? calcShape(array) : array;
    let size = 1;
    for (let i = 0; i < shape.length; i++) {
        size *= shape[i];
    }
    return size;
}