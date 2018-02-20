'use strict';
/**
 *  A JS library for dealing with n-dimensional arrays. 
 *  Referenced from numpy.
 *  Author : Anubhav Tiwari <atworkstudios@gmail.com>
 *
 */

const core = require('./core'),
    math = require('../util/math');

/**
 * 
 * @class Ndarray 
 * 
 */
class Ndarray {
    /**
     * @constructor
     * 
     * @param {Object} param0 - The arguments destructured
     * 
     * @param {Array} param0.shape - The Shape of the Ndarray to be created
     * 
     * @param {String} param0.dtype [dtype='float32'] - The Data Type of the Ndarray data
     * 
     * @param {String} param0.initializer - The initializer to be used to fill Ndarray if 
     *                                      no data is provided.
     * 
     * @param {Array} param0.data - The data, if available, to fill the ndarray 
     * 
     * @param {Rest} args - Rest arguments for initializer
     * 
     */
    constructor({ shape = [], dtype = 'float32', initializer = 'zeros', data = [] } = {}, ...args) {
        this.shape = shape;
        this.dtype = dtype;
        this.size = core.calcSize(this.shape, 'shape');
        this.dim = core.findDim(this.shape, 'shape');
        this.data = data.length > 0 ? core.formArr(core.flatten(data), this.dtype) :
            core.formArr(core.fill([this.size], initializer, ...args), this.dtype);
    }

    /**
     * @method @static  Ndarray.array - form a new Ndarray for the given array 
     * 
     * @param {Array} arr - The Data used to create the Ndarray
     * 
     * @param {String} dtype - The Data type of the ndarray data
     * 
     * @returns {Ndarray.Object} - The new created Ndarray
     * 
     */
    static array(arr, dtype = 'float32') {
        return new Ndarray({ dtype: dtype, data: arr });
    }

    /**
     * 
     * @method @static - Creates a new Ndarray filled with zeroes of specified shape
     *                   Equivalent to new Ndarray({shape, initializer:'zeros'})
     * 
     * @param {Array} shape - The Shape of ndarray to be filled with zeroes 
     * 
     */
    static zeroes(shape) {
        return new Ndarray({ shape, dtype: 'float32', initializer: 'zeros' });
    }


    /* sum of 2 Ndarrays */
    add(v2) {
        return math.sum(this.data, v2.array);
    }

    /* get the shaped data out as ndarray */
    val() {
        return core.arrange(this.shape, core.formArr(this.data));
    }

    /* reshapes the Ndarray only if for the new shape the number of elements remain same */
    reshape(newShape) {
        if (core.calcSize(newShape, 'shape') === this.size) {
            this.shape = newShape;
        } else {
            throw new Error(
                `Resizing error : can't change the shape from ${this.shape} to ${newShape}`
            );
        }
    }

    /* changes the shape and size of the Ndarray in place */
    resize(newShape) {
        this.shape = newShape;
        this.size = core.calcSize(newShape, 'shape');
        this.dim = core.findDim(this.shape, 'shape');
        this.arrange(this.val());
    }

    arrange(elemsArr) {
        this.data = core.formArr(core.flatten(core.arrange(this.shape, elemsArr)), this.dtype);
    }

    fill(initializer, ...args) {
        this.data = core.formArr(core.fill([this.size], initializer, ...args), this.dtype);
    }

    clip(minVal, maxVal) {
        this.arrange(core.clip(this.val(), minVal, maxVal));
    }

    transpose() {
        return core.transpose(this.val(), this.dtype);
    }

    pad(padding) {
        return math.pad(this.val(), padding);
    }
}

module.exports = Ndarray;