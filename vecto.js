/* A JS library for dealing with n-dimensional vectors. 
 * Referenced from numpy.
 * Author : Anubhav Tiwari <atworkstudios@gmail.com>
 */
const sum = require("./util/sum");
const product = require("./util/product");


class Vector {
	constructor(shape = [], arr = []) {
		this.array = arr;
		this.shape = ((shape.length) > 0) ? shape : (Vector.calc_shape(this.array));
		this.size = Vector.calc_size(this.shape);
		this.dim = this.find_dim();
		this.flat = [];
		Vector.flatten(this.array, this.flat);
	}

	/* class specific (static) methods */
	/* form a new vector for the given array */
	static array(arr) {
		return new Vector([], arr);
	}

	/* make a new zero Vector */
	static zeroes(shape) {
		let base_arr = Vector.fill(shape[shape.length - 1], "linear", 0);
		let arr = shape.length < 2 ? base_arr : [];
		for (let i = shape.length - 2; i >= 0; i--) {
			arr = [];
			for (let j = 0; j < shape[i]; j++) {
				arr.push(base_arr);
			}
			base_arr = arr;
		}
		return new Vector(shape, arr);
	}

	/* sum of 2 vectors */
	static add(v1, v2) {
		if (v1.shape.toString() === v2.shape.toString()) {
			let sum = [];
			for (let i = 0; i < v1.flat.length; i++) {
				sum[i] = v1.flat[i] + v2.flat[i];
			}
			let v = new Vector(v1.shape);
			v.arrange(sum, "linear");
			return v;
		}
		else {
			return new Error("Unequal Size");
		}
	}

	//    static dot(v2){

	//    }

	/* function to convert n-dimension array into 1-D array */

	static flatten(arr, tarr) {
		for (let i of arr) {
			if (Array.isArray(i)) {
				this.flatten(i, tarr);
			}
			else {
				tarr.push(i);
			}
		}
	}


	/* fills the vector acc to passed args */
	static fill(len, fill_style = "array", ...args) {
		const arr = [];
		let i;
		if (!args || args.length === 0) {
			for (i = 0; i < len; i++) {
				arr[i] = Math.random();
			}
		}
		else {
			if (args.length === 1) {
				if (Array.isArray(args[0]) && fill_style === "array") {
					for (i = 0; i < len; i++) {
						arr[i] = args[0];
					}
				}
				else if (Array.isArray(args[0]) && fill_style !== "array") {
					let j = 0;
					for (i = 0; i < len; i++) {
						arr[i] = args[0][j++];
						if (j >= args[0].length) {
							j = 0;
						}
					}
				}
				else {
					for (i = 0; i < len; i++) {
						arr[i] = args[0];
					}
				}
			}
			else {
				let min = args[0],
					max = args[1],
					num = min;
				for (i = 0; i < len; i++) {
					arr[i] = num++;
					if (num > max) {
						num = min;
					}
				}
			}
		}
		return arr;
	}

	/* find the shape of array */
	static calc_shape(arr) {
		const shape = [];
		shape.push(arr.length);
		let a = arr[0];
		while (Array.isArray(a)) {
			shape.push(a.length);
			a = a[0];
		}
		return shape;
	}

	/* find the size of the array */
	static calc_size(shape) {
		let size = 1;
		for (let i of shape) {
			size *= i;
		}
		return size;
	}



	/* -------------------------------------------------------------------------------------------------------------------------------------------- */

	/* object specific (property) methods */

	/* find the shape of the given array */

	find_dim() {
		return this.shape.length;
	}

	/* a method to arrange or create a Vector from the given elements */
	// arrange(elems_arr, fill_style = "array") {
	// 	const dim = this.dim;
	// 	let base_arr,
	// 		curr_arr;
	// 	for (let i = dim - 2; i >= -1; i--) {
	// 		if(elems_arr){
	// 			base_arr = elems_arr;
	// 			curr_arr = Vector.fill(this.shape[i + 1], fill_style, base_arr);
	// 			base_arr = curr_arr;
	// 			fill_style = "array";
	// 		}
	// 	}
	// 	this.array = base_arr;
	// 	this.flat = [];
	// 	Vector.flatten(this.array, this.flat);
	// } //----------------------------------------------------------------------------------------------fix it here...............................

	// arrange(elems_arr){
	// 	var dim = this.dim;
	// 	var base_arr_size = this.shape[dim-1];
	// 	var final_arr = [];
	// 	var base_elems = 1, j=0;
	// 	if(dim >= 2){
	// 		base_elems = this.shape[dim-2]; 
	// 	}
	// 	for(var i=0; i<base_elems; i++){
	// 		if(elems_arr){
	// 			var part = [];
	// 			for(var k=0; k<base_arr_size; k++){
	// 				part[k] = elems_arr[j++];
	// 				if(j>=elems_arr.length){
	// 				j=0;
	// 				}
	// 			}
	// 			final_arr.push(Vector.fill(base_arr_size,part));
	// 		}
	// 		else{
	// 			final_arr.push(Vector.fill(base_arr_size));
	// 		}		
	// 	}
	// 	this.array = final_arr;
	// 	this.flat = [];
	// 	Vector.flatten(this.array,this.flat);
	// }

	/* reshapes the vector only if for the new shape the number of elements remain same */
	reshape(new_shape) {
		if (Vector.calc_size(new_shape) === this.size) {
			/* reshape */
			const temp_arr = this.flat;
			this.shape = new_shape;
			this.dim = this.find_dim();
			this.flat = [];
			this.arrange(temp_arr, "linear");
		}
		else {
			return new Error("Resizing error : can't change the size");
		}
	}

	/* changes the shape and size of the vector in place */
	resize(new_shape) {
		const temp_arr = this.flat;
		this.shape = new_shape;
		this.size = Vector.calc_size(new_shape);
		this.dim = this.find_dim();
		this.flat = [];
		this.arrange(temp_arr, "linear");
	}

	/* function to find the transpose */
	transpose() {
		/* converts row <-> columns */
		/* not that useful to main project as of now */
	}

	/* more to come */
}

module.exports = {
	sum: sum,
	product: product,
	Vector: Vector
};
