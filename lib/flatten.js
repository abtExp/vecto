/* function to convert n-dimension array into 1-D array  */
module.exports = function flatten(arr) {
    let flatarr = [];
    if (!Array.isArray(arr)) return [arr];
    for (let i of arr) {
        if (Array.isArray(i))
            flatarr = Array.prototype.concat.apply(flatarr, Array.prototype.concat.apply([], i));
        else flatarr.push(i);
    }
    return flatarr;
}