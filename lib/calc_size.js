/* find the size of the array */
module.exports = function calc_size(array) {
    const calc_shape = require('./calc_shape');
    let shape = calc_shape(array);
    let size = 1;
    for (let i = 0; i < shape.length; i++) {
        size *= shape[i];
    }
    return size;
}