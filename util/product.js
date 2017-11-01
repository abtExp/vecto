"use strict";

module.exports =
    function product(arr1, arr2, mode = "matrix") {
        let prod = [];
        const calc_shape = require('../lib/calc_shape'),
            form_arr = require('../lib/form_arr'),
            flatten = require('../lib/flatten'),
            matmul = require('./matmul'),
            arrange = require('../lib/arrange');

        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            let t1 = flatten(arr1),
                t2 = flatten(arr2),
                s1 = calc_shape(arr1),
                s2 = calc_shape(arr2);
            if (s1.length === 2 && s2.length === 2) {
                if (s1[1] === s2[0] && mode === 'matrix') {
                    return arrange([s1[0], s2[1]], matmul(s1, s2, t1, t2, ));
                } else if (mode === 'dot') {
                    if (s1.toString() === s2.toString()) {
                        prod = product(t1, t2);
                        return arrange(s1, prod);
                    } else {
                        throw new Error(`Uneven shapes: arg1 is ${s1} & arg2 is ${s2}`);
                    }
                }
            } else if (s1.length > 1 && s2.length === 1) {
                if (mode === 'matrix') {
                    if (s1[s1.length - 2] === s2[0]) {
                        let k = 0;
                        for (let i = 0; i < t1.length; i++) {
                            if ((i % s1[s1.length - 1]) === 0 && i !== 0) ++k;
                            prod.push(t1[i] * t2[k]);
                        }
                        return arrange(s1, prod);
                    } else {
                        throw new Error(`Uneven shapes: arg1 is ${s1} & arg2 is ${s2}`);
                    }
                } else {
                    if (s1[s1.length - 1] === s2[0]) {
                        let k = 0;
                        for (let i = 0; i < t1.length; i++) {
                            if (k >= t2.length) k = 0;
                            prod.push(t1[i] * t2[k++]);
                        }
                        return arrange(s1, prod);
                    } else {
                        throw new Error(`Uneven shapes: arg1 is ${s1} & arg2 is ${s2}`);
                    }
                }
            } else if (s1.length === 1 && s2.length > 1) {
                return product(arr2, arr1);
            } else if (s1.length === 1 && s2.length === 1) {
                if (t1.length === t2.length) {
                    for (let i = 0; i < t1.length; i++) {
                        prod.push(t1[i] * t2[i]);
                    }
                } else {
                    throw new Error(`Uneven shapes: arg1 is ${s1} & arg2 is ${s2}`);
                }
            } else {
                if (s1.toString() === s2.toString()) {
                    prod = product(t1, t2);
                    return arrange(s1, prod);
                } else {
                    throw new Error(`Uneven shapes: arg1 is ${s1} & arg2 is ${s2}`);
                }
            }
        } else if (Array.isArray(arr1) && !Array.isArray(arr2)) {
            let t1 = form_arr(flatten(arr1));
            let s1 = calc_shape(arr1);
            for (let i = 0; i < t1.length; i++) {
                prod.push(t1[i] * arr2);
            }
            return arrange(s1, prod);
        } else if (!Array.isArray(arr1) && Array.isArray(arr2)) {
            return product(arr2, arr1);
        }
        return prod;
    }