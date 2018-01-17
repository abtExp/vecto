const { arrange, calcShape, formArr, flatten, fill } = require('../lib/core');

/**
 * 
 * @function pad - performs padding on ndarrays and adds zeros to the extra region
 * 
 * @param {Array} inputArray - The Array to be padded
 * 
 * @param {Array/int} padding - Either an Array giving the padding [h,w] or an integer
 *                              for h = w
 * 
 * @returns {Array} the padded array 
 * 
 */


module.exports = function pad(inputArray, padding, dtype = 'float32') {
    const ipShape = calcShape(inputArray);
    /**
     * 
     * Cases : 1: ipShape = [m, nh, nw, c]  -> opShape = [m, nh+2ph, nw+2pw, c]
     *         2: ipShape = [nh, nw, c]     -> opShape = [1, nh+2ph, nw+2pw, c]
     *         3: ipShape = [nh, nw]        -> opShape = [nh+2ph, nw+2pw]
     *         4: ipShape = [nw] => [1, nw] -> opShape = [1, nw+2pw]
     * 
     */

    let [ph, pw, nh, nw, c, m, opShape] = findParams(ipShape, padding),
        ipSize = m * nh * nw * c,
        ipImElems = nh * nw * c,
        ipRowElems = nw * c,
        opSize = m * (nh + (2 * ph)) * (nw + (2 * pw)) * c,
        opImElems = (nh + (2 * ph)) * (nw + (2 * pw)) * c,
        opRowElems = (nw + (2 * pw)) * c,
        rowSkip = ph * opRowElems,
        colSkip = pw * c,
        k = 0, j = 0;

    let ipArr = formArr(flatten(inputArray), dtype),
        opArr = formArr(fill([opSize], 'zeros'), dtype);

    for (let i = 0; k < ipSize; i++) {
        if (i % opImElems === 0) i += rowSkip;
        i += colSkip;
        for (j = 0; j < ipRowElems; j++) {
            opArr[i + j] = ipArr[k++];
        }
        i = i + j - 1;
        i += colSkip;
        if (k % ipImElems === 0) i += rowSkip;
    }
    // arrange is broken
    return arrange(opShape, opArr);
}

function findParams(ipShape, padding) {
    let ph, pw, nh, nw, c, m, opShape;
    m = c = 1;

    if (ph !== 0) ph = Array.isArray(padding) ? padding[0] : padding;
    pw = Array.isArray(padding) ? ((padding.length > 1) ? padding[1] : padding[0]) : padding;

    switch (ipShape.length) {
        case 1:
            [nw] = ipShape;
            nh = 1;
            ph = 0;
            opShape = [(nh + (2 * ph)), (nw + (2 * pw))];
            break;
        case 2:
            [nh, nw] = ipShape;
            opShape = [(nh + (2 * ph)), (nw + (2 * pw))]
            break;
        case 3:
            [nh, nw, c] = ipShape;
            opShape = [m, (nh + (2 * ph)), (nw + (2 * pw)), c];
            break;
        case 4:
            [m, nh, nw, c] = ipShape;
            opShape = [m, (nh + (2 * ph)), (nw + (2 * pw)), c];
    }
    return [ph, pw, nh, nw, c, m, opShape];
}