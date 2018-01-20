/**
 * @function arrange : A method to arrange or create a Vector from the given elements 
 *            
 * @param {Array} shape - @requires shape -The shape of the array to be filled or arranged
 * 
 * @param {Array} elems_arr - The elements to be arranged
 * 
 * @returns {Array} - Array of the provided shape filled with the passed elements or random elements
 * 
 */

module.exports = function arrange(shape, elems_arr) {
    const { formChunks, flatten } = require('./core');
    let base_arr = flatten(elems_arr),
        curr_arr = [];
    for (let i = shape.length - 1; i > 0; i--) {
        let size = shape[i],
            no = 1;
        for (let j = 0; j < i; j++) {
            no *= shape[j];
        }
        curr_arr = formChunks(size, no, base_arr);
        base_arr = curr_arr;
    }
    return base_arr;
}