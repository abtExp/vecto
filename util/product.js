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
		
		if(s1.length === 2 && s2.length === 2){
			if(s1[1] === s2[0] && mode === 'matrix'){
				prod = Matrix.matrix_prod(t1,t2,s1,s2);
			}
			else if(mode==='dot'){
				if(s1.toString() === s2.toString()){
					prod = product(ta1,ta2);
					return arrange(s1,prod);
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
					return arrange(s1,prod);
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
					return arrange(s1,prod);
				}
				else{
					throw new Error("Uneven Size");
				}
			}
		}
		else if(s1.length === 1 && s2.length > 1){
			return product(arr2,arr1);
		}
		else if(s1.length === 1 && s2.length === 1){
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
				prod = product(ta1,ta2);
				return arrange(s1,prod);
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
		let s1 = calc_shape(arr1);
		for(let i=0; i<t1.length; i++){
			prod.push(t1[i]*arr2);
		}
		return arrange(s1,prod);
	}
	else if(!Array.isArray(arr1) && Array.isArray(arr2)){
		return product(arr2,arr1);
	}
	return prod;
}

