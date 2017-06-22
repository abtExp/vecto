/* find the shape of array  */
module.exports = function calc_shape(arr) {
    const shape = [];
    shape.push(arr.length);
    let a = arr[0];
    while (Array.isArray(a)) {
        shape.push(a.length);
        a = a[0];
    }
    return shape;
}
