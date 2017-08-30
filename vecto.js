"use strict";
const ndarray = require('./lib/ndarray'),
    core = require('./lib/core'),
    math = require('./util/math');

(() => {
    if (typeof window !== 'undefined') {
        window.ndarray = ndarray;
        window.core = core;
        window.math = math
    }
})();

module.exports = {
    ndarray: ndarray,
    math: math,
    core: core
}