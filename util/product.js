/* product : test cases : 
^ *1 [a,b,c] * [x,y,z]  // equal length 1-d arrays
*2 [a,b,c] * [x,y]  // unequal length, must result in an uneven size error
*3 [a,b,c] * [x] || [a,b,c] * x  // if length of arg2 is 1 or if arg2 is scalar
*4 [[a,b,c],[d,e,f],[g,h,i]] * [a,b]  //arg1 is n-d but len(arg1) !== len(arg2), uneven size err
^ *5 [[a,b,c],[d,e,f]] * [x,y,z]  // len(arg1) !== len(arg2) but len(arg1[i]) == len(arg2), must multiply arg2 with each arg[i]
^ *6 a * x || [a] * [x]  // return a*x
*/
const Matrix = require('./Matrix');

function product(arr1, arr2) {
	let prod = [];
	if(Array.isArray(arr1) && !Array.isArray(arr2)){
		if(Array.isArray(arr1[0])){
			arr1.forEach(i=>{
				prod.push(product(i,arr2));
			})
		}
		else{
			arr1.forEach(i=>{
				prod.push(i*arr2);
			})
		}
	}

	else if(!Array.isArray(arr1) && Array.isArray(arr2)){
		return product(arr2,arr1);
	}

	else{
		if(Array.isArray(arr1[0]) && Array.isArray(arr2[0])){
			const { Vector } = require('../vecto');
			let ar1_shape = Vector.calc_shape(arr1);
			let ar2_shape = Vector.calc_shape(arr2);
			if(ar1_shape.length === ar2_shape.length === 2){
				if(ar1_shape[1] === ar2_shape[0]){
					return Matrix.matrix_prod(arr1,arr2);
				}
				else{
					if(ar1_shape.toString() === ar2_shape.toString()){
						for(let i=0; i<ar1.length; i++){
							prod.push(product(ar1[i],ar2[i]));
						}
					}
					else{
						throw new Error("Uneven Size");
					}
				}
			}
		}
		else if(Array.isArray(arr1[0]) && !Array.isArray(arr2[0])){
			if(arr1.length === arr2.length){
				let j=0;
				arr1.forEach(i=>{
					prod.push(product(i,arr2[j++]));
				})
			}
			else if(arr1[0].length === arr2.length){
				arr1.forEach(i=>{
					prod.push(i*arr2);
				})
			}
			else{
				return new Error("Uneven Size");
			}
		}

		else if(!Array.isArray(arr1[0]) && Array.isArray(arr2[0])){
			return product(arr2,arr1);
		}

		else{
			if(arr1.length === arr2.length){
				let k=0;
				arr1.forEach(i=>{
					prod.push(i*arr2[k++]);
				})
			}
			else{
				throw new Error("Uneven Size");
			}
		}
	}
	return prod;
}

module.exports = product;