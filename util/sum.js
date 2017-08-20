module.exports = function sum(arr1, arr2) {
    const calc_shape = require('../lib/calc_shape');
    const arrange = require('../lib/arrange');
    const form_arr = require('../lib/form_arr');
    const flatten = require('../lib/flatten');
    let summ, t1, t2, s1, s2;
    if (!arr2) {
        t1 = form_arr(flatten(arr1));
        s1 = calc_shape(arr1);
        if (s1.length > 1) {
            summ = [];
            let s = 0;
            for (let i = 0; i <= t1.length; i++) {
                if ((i % s1[s1.length - 1]) === 0 && i !== 0) {
                    summ.push(s);
                    s = 0;
                }
                s += t1[i];
            }
            return summ;
        } else {
            summ = 0;
            for (let i = 0; i < t1.length; i++) {
                summ += t1[i];
            }
            return summ;
        }
    } else {
        if (Array.isArray(arr1) && Array.isArray(arr2)) {
            t1 = form_arr(flatten(arr1));
            t2 = form_arr(flatten(arr2));
            s1 = calc_shape(arr1);
            s2 = calc_shape(arr2);
            if (s1.toString() === s2.toString()) {
                summ = [];
                for (let i = 0; i < t1.length; i++) {
                    summ[i] = t1[i] + t2[i];
                }
                return arrange(s1, summ);
            } else {
                throw new Error("Uneven Size");
            }
        } else if (Array.isArray(arr1) && !Array.isArray(arr2)) {
            t1 = form_arr(flatten(arr1));
            s1 = calc_shape(arr1);
            for (let i = 0; i < t1.length; i++) {
                t1[i] += arr2;
            }
            return arrange(s1, t1);
        }
    }
}