/** 
 * 
 * @function minK : Returns The Indices of first k min values
 *  
 * @param {Array} array - The array for finding min elems
 * 
 * @param {int} k - The number of elements to return
 * 
 * @returns {Array} - The array of indices of min elems
 *  
 */

function minK(data, k) {
    let mn = [],
        min = -1e8,
        max = 1e8,
        maxIdx = 0;
    while (k > 0) {
        for (let i = 0; i < data.length; i++) {
            if ((data[i] > min) && (data[i] < max)) {
                max = data[i];
                maxIdx = i;
            }
        }
        mn.push(maxIdx);
        min = max;
        max = 1e8;
        k--;
    }
    return mn;
}