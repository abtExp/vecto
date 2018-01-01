/* find the dimension of the array */
module.exports = function findDim(array) {
    const calc_shape = require('./calcShape');
    const shape = calcShape(array);
    return shape.length;
}