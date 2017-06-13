/* find the size of the array */
module.exports = function calc_size(shape) {
    let size = 1;
    for (let i=0; i<shape.length; i++) {
        size *= shape[i];
    }
    return size;
}