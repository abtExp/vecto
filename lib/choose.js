/* * Forms a new array consisting of selected elements 
    ( Selects elements from a given array and forms a new array of those elements )  
 *
 *   function prototype : 
 *          choose(array,...args)
 *          @array : [number] : Required
 *          
 *          @...args : number/[number] : either a single digit to select the 
 *                                       element at given index from every element of 
 *                                       the given ndarray or depicting the dimension of the elements
 *                                       to select
 * 
 *   returns : [number] the new array
 */


module.exports = function choose(array, ...args) {
    const { calc_shape, calc_size, form_arr, flatten, arrange } = require('./core');

    if (!args || args.length === 0) {
        return array;
    } else {
        let arr = flatten(array),
            shape = calc_shape(array),
            axis = args[0],
            elem = args[1] || null,
            jump = shape[axis - 1];

    }
}