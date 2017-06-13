/* A JS library for dealing with n-dimensional arrays. 
 * Referenced from numpy.
 * Author : Anubhav Tiwari <atworkstudios@gmail.com>
 */
const sum = require("./util/sum");
const product = require("./util/product");
const core = require('./lib/core');

class Vector {
	constructor(shape=[],arr=[], dtype='uint8') {
		this.array = arr;
		this.shape = ((shape.length) > 0) ? shape : (core.calc_shape(this.array));
		this.size = core.calc_size(this.shape);
		this.dim = core.find_dim(this.shape);
		let temp = []
		this.dtype = dtype;
		core.flatten(this.array, temp);
		this.flat = core.form_arr(temp,this.dtype);
	}

	/* class specific (static) methods */
	/* form a new vector for the given array */
	static array(arr) {
		return new Vector([], arr);
	}

	/* make a new zero Vector */
	static zeroes(shape) {
		let base_arr = core.fill(shape[shape.length - 1], "linear", 0);
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

/* -------------------------------------------------------------------------------------------------------------------------------------------- */

	/* object specific (property) methods */
	
	/* sum of 2 vectors */
	add(v2) {
		if (this.shape.toString() === v2.shape.toString()) {
			let sum = [];
			for (let i = 0; i < v1.flat.length; i++) {
				sum[i] = this.flat[i] + v2.flat[i];
			}
			this.arrange(sum, "linear");
		}
		else {
			return new Error("Unequal Size");
		}
	}

	/* reshapes the vector only if for the new shape the number of elements remain same */
	reshape(new_shape) {
		if (core.calc_size(new_shape) === this.size) {
			/* reshape */
			const temp_arr = this.flat;
			this.shape = new_shape;
			this.dim = core.find_dim(this.shape);
			core.arrange(temp_arr, "linear");
			let temp = [];
			core.flatten(this.array, temp);
			this.flat = core.form_arr(temp,this.dtype);
		}
		else {
			return new Error("Resizing error : can't change the size");
		}
	}

	/* changes the shape and size of the vector in place */
	resize(new_shape) {
		const temp_arr = this.flat;
		this.shape = new_shape;
		this.size = core.calc_size(new_shape);
		this.dim = core.find_dim(this.shape);
		core.arrange(temp_arr, "linear");
		let temp = [];
		core.flatten(this.array, temp);
		this.flat = core.form_arr(temp,this.dtype);
	}


	/* more to come */
}

module.exports = {
	sum: sum,
	product: product,
	Vector: Vector,
	core : core
};
