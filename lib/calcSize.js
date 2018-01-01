/* find the size of the array */
module.exports = function calcSize(array, flag = 'array') {
    const calcShape = require('./calcShape');
    let shape = flag === 'array' ? calcShape(array) : array;
    let size = 1;
    for (let i = 0; i < shape.length; i++) {
        size *= shape[i];
    }
    return size;
}