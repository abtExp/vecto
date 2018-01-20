'use strict';

/**
 *  A JS library for dealing with n-dimensional arrays. 
 *  Referenced from numpy.
 *  Author : Anubhav Tiwari <atworkstudios@gmail.com>
 *
 */

/* Make the Ndarray interface and make vecto faster  ************
 *      _______   _____           _____     _____    ************
 ****  |#######| /#####\          |####\   /#####\   ************
 ****     |#|   |#|   |#|  _____  |#| |#| |#|   |#|  ************
 ****     |#|   |#|   |#| |_____| |#|_|#| |#|   |#|  ************
 ****     |#|    \#####/          |####/   \#####/   ************
 ***************************************************************/

const core = require('./core'),
    math = require('../util/math');

class Ndarray {
    constructor({ shape = [], dtype = 'float32', initializer = 'zeros', data = [] } = {}, ...args) {
        this.shape = shape;
        this.size = core.calcSize(this.shape, 'shape');
        this.dim = core.findDim(this.shape, 'shape');
        this.dtype = dtype;
        this.flat = [];
        data.length > 0 ? this.flatten(data) :
            this.flatten(core.fill(this.shape, initializer, ...args));
    }

    /* form a new Ndarray for the given array */
    static array(arr, dtype = 'float32') {
        return new Ndarray({ dtype: dtype, data: arr });
    }

    /* sum of 2 Ndarrays */
    add(v2) {
        return math.sum(this.array, v2.array);
    }

    /* reshapes the Ndarray only if for the new shape the number of elements remain same */
    reshape(newShape) {
        if (core.calcSize(newShape, 'shape') === this.size) {
            const tempArr = core.formArr(this.flat);
            this.shape = newShape;
            this.flatten(tempArr);
        } else {
            return new Error(`Resizing error : can't change the shape from ${this.shape} to ${newShape}`);
        }
    }

    /* changes the shape and size of the Ndarray in place */
    resize(newShape) {
        const tempArr = core.formArr(this.flat);
        this.shape = newShape;
        this.size = core.calcSize(newShape);
        this.flatten(tempArr);
    }

    arrange(elemsArr) {
        this.flatten(elemsArr);
    }

    fill(initializer, ...args) {
        let array = core.fill(this.shape, this.dtype, initializer, ...args);
        this.flatten(array);
    }

    clip(minVal, maxVal) {
        this.arrange(core.clip(this.array, minVal, maxVal));
    }

    flatten(data) {
        this.flat = core.formArr(core.flatten(data), this.dtype);
    }

    transpose() {
        return core.transpose(this.array, this.dtype);
    }

}

module.exports = Ndarray;