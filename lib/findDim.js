/* find the dimension of the array */
module.exports = function findDim(array) {
    const calcShape = require('./calcShape');
    const shape = calcShape(array);
    return shape.length;
}