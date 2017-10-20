"use strict";
const Ndarray = require('./lib/ndarray'),
    core = require('./lib/core'),
    math = require('./util/math');

(() => {
    if (typeof window !== 'undefined') {
        window.Ndarray = Ndarray;
        window.core = core;
        window.math = math
    }
})();

module.exports = {
    Ndarray: Ndarray,
    math: math,
    core: core
}