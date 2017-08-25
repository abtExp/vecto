/* a method to arrange or create a Vector from the given elements */
module.exports = function arrange(shape, elems_arr) {
    const calc_size = require('./calc_size');
    const fill = require('./fill');
    const form_chunks = require('./form_chunks');
    const flatten = require('./flatten');
    elems_arr = elems_arr || fill(calc_size(shape), "linear");
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