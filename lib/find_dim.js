/* find the dimension of the array */
module.exports = function find_dim(array) {
    const calc_shape = require('./calc_shape');
    const shape = calc_shape(array);
    return shape.length;
}