/**
 * @function flatten - Convert NDarray to 1Darray
 * 
 * @param {Array} arr - The Array to be converted from ND to 1D
 * 
 * @returns {Array} the 1D version of the passed ndarray
 *  
 */
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