/* product : test cases : 
^ *1 [a,b,c] * [x,y,z]  // equal length 1-d arrays
*2 [a,b,c] * [x,y]  // unequal length, must result in an uneven size error
*3 [a,b,c] * [x] || [a,b,c] * x  // if length of arg2 is 1 or if arg2 is scalar
*4 [[a,b,c],[d,e,f],[g,h,i]] * [a,b]  //arg1 is n-d but len(arg1) !== len(arg2), uneven size err
^ *5 [[a,b,c],[d,e,f]] * [x,y,z]  // len(arg1) !== len(arg2) but len(arg1[i]) == len(arg2), must multiply arg2 with each arg[i]
^ *6 a * x || [a] * [x]  // return a*x
*/
module.exports = function product(arr1, arr2) {
	const prod = [];
	if (!Array.isArray(arr1) && !Array.isArray(arr2)) {
		return arr1 * arr2;
	}
	else {
		if (Array.isArray(arr1) && !Array.isArray(arr2)) {
			arr1.forEach((i) => {
				if (Array.isArray(i)) {
					prod.push(product(i, arr2));
				}
				else {
					prod.push(i * arr2);
				}
			});
		}
		else if (!Array.isArray(arr1) && Array.isArray(arr2)) {
			return product(arr2, arr1);
		}
		else {
			if (Array.isArray(arr1[0]) && !Array.isArray(arr2[0])) { //checking if arg1 is n-d and arg2 is 1-d
				if (arr1[0].length === arr2.length) {
					arr1.forEach((j) => {
						prod.push(product(j, arr2));
					})
				}
				else {
					if (arr1.length === arr2.length) {
						let i = 0;
						arr1.forEach((j) => {
							prod.push(product(j, arr2[i++]));
						})
					}
					else {
						throw new Error("Uneven size!");
					}
				}
			}
			else {
				if (Array.isArray(arr1[0]) && Array.isArray(arr2[0])) {
					if (arr1.length === arr2.length) {
						for (let i = 0; i < arr1.length; i++) {
							prod.push(product(arr1[i], arr2[i]));
						}
					}
					else {
						throw new Error("Uneven Size");
					}
				}
				else {
					if (arr1.length === arr2.length) {
						for (let i = 0; i < arr1.length; i++) {
							prod.push(arr1[i] * arr2[i]);
						}
					}
					else {
						throw new Error("Uneven Size");
					}
				}
			}
		}
	}
	return prod;
}
