/* find the size of the array */
module.exports = function calc_size(array, flag = 'array') {
    const calc_shape = require('./calc_shape');
    let shape = flag === 'array' ? calc_shape(array) : array;
    let size = 1;
    for (let i = 0; i < shape.length; i++) {
        size *= shape[i];
    }
    return size;
}