/* product : test cases : 
*1 [a,b,c] * [x,y,z]  // equal length 1-d arrays
*2 [a,b,c] * [x,y]  // unequal length, must result in an uneven size error
*3 [a,b,c] * [x] || [a,b,c] * x  // if length of arg2 is 1 or if arg2 is scalar
*4 [[a,b,c],[d,e,f],[g,h,i]] * [a,b]  //arg1 is n-d but len(arg1) !== len(arg2), uneven size err
*5 [[a,b,c],[d,e,f]] * [x,y,z]  // len(arg1) !== len(arg2) but len(arg1[i]) == len(arg2), must multiply arg2 with each arg[i]
*/
const Matrix = require('./Matrix');
const calc_shape = require('../lib/calc_shape');
const form_arr = require('../lib/form_arr');
const flatten = require('../lib/flatten');

function product(arr1, arr2, mode="dot") {
	let prod = [];
	if(Array.isArray(arr1) && Array.isArray(arr2)){
		let ta1 = form_arr(flatten(arr1)),
		ta2 = form_arr(flatten(arr2)),
		s1 = calc_shape(arr1),
		s2 = calc_shape(arr2);
		if(s1[1] === s2[0]){
			prod = Matrix.matrix_prod(ta1,ta2);
		}
	}
}


// Make it easy.
