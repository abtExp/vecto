/* A method to arrange or create a Vector from the given elements 
 *   function prototype :
 *            arrange(shape=[number], ?elems_arr=[number])
 *            @shape     : [number] : Required, The shape of the array to be filled or arranged
 *          ? @elems_arr : [number] : The elements to be arranged
 *   Returns : [number] : Array of the provided shape filled with the passed elements or random elements
 */
module.exports = function arrange(shape, elems_arr) {
    const { form_chunks, flatten } = require('./core');
    let base_arr = flatten(elems_arr),
        curr_arr = [];
    for (let i = shape.length - 1; i > 0; i--) {
        let size = shape[i],
            no = i > 1 ? shape[i - 1] * shape[i - 2] : shape[i - 1];
        curr_arr = form_chunks(size, no, base_arr);
        base_arr = curr_arr;
    }
    return base_arr;
}