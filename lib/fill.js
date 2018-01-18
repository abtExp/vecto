"use strict";

/**
 *
 * @function fill - fills the vector according to passed args
 *
 * @param {Array} shape - The shape of the array to be filled (Required)
 * 
 * @param {String} initializer - The distribution of elements to be filled
 *                                      { 
 *                                          1. 'linear' (random or uniform filling or single elem filling)
 *                                          2. 'zeros'  (filling with zeroes)
 *                                          3. 'gaussian' (gaussian distribution)
 *                                          4. 'custom' (fills the value acc to a passed function)
 *                                      }
 * 
 * @param {rest} ...args -   {
 *                               1. for linear, args.len === 0 => random filling
 *                                              args.len === 1 => fill with that value
 *                                              args.len === 2 => the max and min ranges with steps of min
 *                                              args.len === 3 => the max, min and the step
 *                               2. for gaussian, args[0] = mean (defaults to 0)
 *                                              args[1] = variance (defaults to 1)
 *                            }
 * 
 * @returns {Array} - The filled array
 * 
 */

module.exports = function fill(shape, initializer = 'linear', ...args) {
    const { calcSize, arrange } = require('./core');
    initializer = initializer || 'zeros';
    let arr = [],
        size = calcSize(shape, 'shape');
    if (initializer === 'zeros') {
        arr = zeros(size);
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
                    digs;
                // calculating the step size
                (() => {
                    digs = 0;
                    let nums = min;
                    while (Math.floor(nums) !== nums) {
                        digs++;
                        nums *= 10;
                    }
                })();
                let step = args[2] || (1 / Math.pow(10, digs));
                for (let i = 0; i < size; i++) {
                    arr[i] = num;
                    num += step;
                    if (num > max) num = min;
                }
                break;
        }
    } else if (initializer === 'gaussian') {
        arr = gaussian(args[0], args[1], size);
    } else if (initializer === 'custom') {
        for (let i = 0; i < size; i++) {
            arr[i] = args[0]();
        }
    }
    let retval = arrange(shape, arr);
    return retval;
}


function zeros(size) {
    let arr = [];
    for (let i = 0; i < size; i++) {
        arr[i] = 0;
    }
    return arr;
}

function gaussian(mean = 0, stddev = 1, size) {
    let v1, v2, s, arr = [];
    for (let i = 0; i < size; i++) {
        do {
            v1 = 2 * Math.random() - 1;
            v2 = 2 * Math.random() - 1;
            s = v1 * v1 + v2 * v2;
        } while (s > 1);

        let res = Math.sqrt(-2 * Math.log(s) / s) * v1;
        arr[i] = mean + (stddev * res);
    }
    return arr;
}