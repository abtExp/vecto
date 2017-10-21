/* function to find the transpose */
module.exports = function transpose(arr, dtype = 'uint8') {
    const { calc_shape, flatten, form_arr, arrange } = require('./core');
    let flat_arr = flatten(arr),
        s = calc_shape(arr),
        t = form_arr(flat_arr, dtype),
        r = s.length > 1 ? s[0] : 1,
        c = s.length > 1 ? s[1] : s[0],
        k = 0,
        b = [];
    for (let i = 0; i < c; i++) {
        for (let j = i; j < t.length; j += c) {
            b[k++] = t[j];
        }
    }
    return arrange([c, r], b);
}