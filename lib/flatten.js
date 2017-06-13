/* function to convert n-dimension array into 1-D array */
module.exports = function flatten(arr, tarr) {
    for (let i of arr) {
        if (Array.isArray(i)) {
            flatten(i, tarr);
        }
        else {
            tarr.push(i);
        }
    }
}