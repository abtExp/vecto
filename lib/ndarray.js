/* A JS library for dealing with n-dimensional arrays. 
 * Referenced from numpy.
 * Author : Anubhav Tiwari <atworkstudios@gmail.com>
 */

const core = require('./core'),
    math = require('../util/math');

class Ndarray extends Array {
    constructor({ shape = [], dtype = 'float32', initializer = 'zeros', arr = [] }, ...args) {
        let array = arr.length === 0 ? core.fill(shape, dtype, initializer, ...args) : arr;
        super(...array);
        this.shape = ((shape.length) > 0) ? shape : (core.calc_shape(this.array));
        this.size = core.calc_size(this.array);
        this.dim = core.find_dim(this.array);
        this.dtype = dtype;
        this.flat = core.form_arr(core.flatten(this.array), this.dtype);
    }

    valueOf() {
        return super.valueOf();
    }

    /* class specific (static) methods */
    /* form a new Ndarray for the given array */
    static array(arr) {
        return new Ndarray([], 'float32', 'custom', arr);
    }

    /* make a new zero Ndarray */
    static zeroes(shape) {
        return new Ndarray(shape, 'float32', 'zeros');
    }

    /* ---------------------------------------------------------------- */

    /* object specific (property) methods */

    /* sum of 2 Ndarrays */
    add(v2) {
        return math.sum(this.array, v2.array);
    }

    /* reshapes the Ndarray only if for the new shape the number of elements remain same */
    reshape(new_shape) {
        if (core.calc_size(new_shape, 'shape') === this.size) {
            /* reshape */
            const temp_arr = this.flat;
            this.shape = new_shape;
            this.arrange(temp_arr);
        } else {
            return new Error(`Resizing error : can't change the shape from ${this.shape} to ${new_shape}`);
        }
    }

    /* changes the shape and size of the Ndarray in place */
    resize(new_shape) {
        const temp_arr = this.flat;
        this.shape = new_shape;
        this.size = core.calc_size(new_shape);
        this.arrange(temp_arr);
    }

    arrange(elems_arr) {
        this.array = core.arrange(this.shape, elems_arr);
        this.flatten();
        this.size = core.calc_size(this.array);
        this.shape = core.calc_shape(this.array);
        this.dim = core.find_dim(this.array);
    }

    fill(initializer, ...args) {
        this.array = core.fill(this.shape, this.dtype, initializer, ...args);
        this.flatten();
    }

    clip(min_val, max_val) {
        this.arrange(core.clip(this.array, min_val, max_val));
    }

    flatten() {
        this.flat = core.form_arr(core.flatten(this.array), this.dtype);
        return this.flat;
    }

    transpose() {
        return core.transpose(this.array, this.dtype);
    }

}

module.exports = Ndarray;