/* product : test cases : 
*1 [a,b,c] * [x,y,z]  // equal length 1-d arrays
*2 [a,b,c] * [x,y]  // unequal length, must result in an uneven size error
*3 [a,b,c] * [x] || [a,b,c] * x  // if length of arg2 is 1 or if arg2 is scalar
*4 [[a,b,c],[d,e,f],[g,h,i]] * [a,b]  //arg1 is n-d but len(arg1) !== len(arg2), uneven size err
*5 [[a,b,c],[d,e,f]] * [x,y,z]  // len(arg1) !== len(arg2) but len(arg1[i]) == len(arg2), must multiply arg2 with each arg[i]
*/

module.exports = function product(arr1, arr2,mode="matrix") {
	let prod = [];
	const Matrix = require('./Matrix');
	const calc_shape = require('../lib/calc_shape');
	const form_arr = require('../lib/form_arr');
	const flatten = require('../lib/flatten');
	const arrange = require('../lib/arrange');
	if(Array.isArray(arr1) && Array.isArray(arr2)){
		let ta1 = [],
		ta2 = [];
		flatten(arr1,ta1);
		flatten(arr2,ta2);
		let t1 = form_arr(ta1),
		t2 = form_arr(ta2),
		s1 = calc_shape(arr1),
		s2 = calc_shape(arr2);

		if(s1.length === s2.length === 2){
			if(s1[1] === s2[0] && mode === 'matrix'){
				prod = Matrix.matrix_prod(t1,t2,s1,s2);
			}
			else if(mode==='dot'){
				if(s1.toString() === s2.toString()){
					return product(t1,t2);
				}
				else{
					throw new Error("Uneven shape");
				}
			}
		}
		else if(s1.length > 1 && s2.length === 1){
			if(mode === 'matrix'){
				if(s1[s1.length-2] === s2[0]){
					let k=0;
					for(let i=0; i<t1.length; i++){
						if((i%t2.length)===0 && i!==0) ++k;
						prod.push(t1[i]*t2[k]);
					}
				}
				else{
					throw new Error("Uneven Size");
				}
			}
			else{
				if(s1[s1.length-1] === s2[0]){
					let k = 0;
					for(let i=0; i<t1.length; i++){
						if(k>=t2.length)k=0;
						prod.push(t1[i]*t2[k++]);
					}
				}
				else{
					throw new Error("Uneven Size");
				}
			}
		}
		else if(s1.length === 1 && s2.length > 1){
			return product(arr2,arr1);
		}
		else if(s1.length === s2.length === 1){
			if(t1.length === t2.length){
				for(let i=0; i<t1.length; i++){
					prod.push(t1[i]*t2[i]);
				}
			}
			else{
				throw new Error("Uneven Size");
			}
		}
		else{
			if(s1.toString() === s2.toString()){
				return product(t1,t2);
			}
			else{
				throw new Error("Uneven size");
			}
		}
	}
	else if(Array.isArray(arr1) && !Array.isArray(arr2)){
		let ta1 = [];
		flatten(arr1,ta1);
		let t1 = form_arr(ta1);
		for(let i=0; i<t1.length; i++) prod.push(t1[i]*arr2);
	}
	else if(!Array.isArray(arr1) && Array.isArray(arr2)){
		return product(arr2,arr1);
	}
	return prod;
}

