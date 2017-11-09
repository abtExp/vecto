/* form chunks  */
module.exports = function form_chunks(size, no, arr) {
    let chunk = [],
        final = [],
        k = 0;
    for (let i = 0; i < no; i++) {
        chunk = [];
        for (let j = 0; j < size; j++) {
            chunk[j] = arr[k++];
            if (k >= arr.length) k = 0;
        }
        final.push(chunk);
    }
    return final;
}