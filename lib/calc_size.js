/* find the size of the array */
module.exports = function calc_size(shape) {
    let size = 1;
    for (let i of shape) {
        size *= i;
    }
    return size;
}