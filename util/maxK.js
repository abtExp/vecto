/** 
 * 
 * @function maxK : Returns The Indices of first k max values
 *  
 * @param {Array} array - The array for finding max elems
 * 
 * @param {int} k - The number of elements to return
 * 
 * @returns {Array} - The array of indices of max elems
 *  
 */

function maxK(array, k) {
    let maxK = [],
        maxIdx = 0,
        max = 1e8,
        min = 1e-8;
    while (k > 0) {
        for (let i = 0; i < array.length; i++) {
            if ((array[i] > min) && (array[i] < max)) {
                min = array[i];
                maxIdx = i;
            }
        }
        max = min;
        min = 1e-8;
        maxK.push(maxIdx);
        k--;
    }
    return maxK;
}