/* find the dimension of the array */
module.exports = function findDim(array, flag = 'array') {
    const calcShape = require('./calcShape');
    let shape = array;
    if (flag === 'array') shape = calcShape(array);
    return shape.length;
}