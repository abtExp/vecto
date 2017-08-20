"use strict";
const ndarray = require('./lib/ndarray');
const sum = require('./util/sum');
const product = require('./util/product');
const core = require('./lib/core');
(() => {
    if (typeof window !== 'undefined') {
        window.ndarray = ndarray;
        window.core = core;
        window.sum = sum;
        window.product = product;
    }
})();

module.exports = {
    ndarray: ndarray,
    sum: sum,
    product: product,
    core: core
}