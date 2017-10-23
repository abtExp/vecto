/* fill: fills the vector according to passed args
 *
 * @shape : [Number] : The shape of the array to be filled (Required)
 * 
 * @initializer : 'String' : The distribution of elements to be filled
 *                                      { 
 *                                          1. 'linear' (random or uniform filling or single elem filling)
 *                                          2. 'zeros'  (filling with zeroes)
 *                                          3. 'gaussian' (gaussian distribution)
 *                                      }
 * 
 * @...args : [Number] (Rest Parameters) : 
 *                                      {
 *                                          1. for linear, args.len === 0 => random filling
 *                                                         args.len === 1 => fill with that value
 *                                                         args.len === 2 => the max and min ranges with steps of min
 *                                                         args.len === 3 => the max, min and the step
 *                                          2. for gaussian, args[0] = mean (defaults to 0)
 *                                                           args[1] = variance (defaults to 1)
 *                                      }
 * 
 *  Returns : [Number] : The filled array
 * 
 */

module.exports = function fill(shape, initializer = 'linear', ...args) {
    const { calc_size, arrange } = require('./core');
    initializer = initializer || 'zeros';
    let arr = [],
        size = calc_size(shape, 'shape');
    if (initializer === 'zeros') {
        for (let i = 0; i < size; i++) {
            arr[i] = 0;
        }
    } else if (initializer === 'linear') {
        switch (args.length) {
            case 0:
                for (let i = 0; i < size; i++) {
                    arr[i] = Math.random();
                }
                break;
            case 1:
                for (let i = 0; i < size; i++) {
                    arr[i] = args[0];
                }
                break;
            default:
                let min = args[0],
                    max = args[1],
                    num = min,
                    step = args[2] || 1 || min;
                for (let i = 0; i < size; i++) {
                    arr[i] = num;
                    num += step;
                    if (num > max) num = min;
                }
                break;
        }
    } else if (initializer === 'gaussian') {
        let mean = args[0] || 0,
            dev = args[1] || 1,
            v1, v2, s;
        for (let i = 0; i < size; i++) {
            do {
                v1 = 2 * Math.random() - 1;
                v2 = 2 * Math.random() - 1;
                s = v1 * v1 + v2 * v2;
            } while (s > 1);

            let res = Math.sqrt(-2 * Math.log(s) / s) * v1;
            arr[i] = mean + dev * res;
        }
    }

    return arrange(shape, arr);
}