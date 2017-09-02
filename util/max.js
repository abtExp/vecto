function max(arg1, arg2, axis = 0) {
    const arrange = require('../lib/arrange'),
        calc_shape = require('../lib/calc_shape'),
        flatten = require('../lib/flatten');
    let ar1, ar2, s1, s2, jump_len = 1,
        inc = 1,
        switches = 0,
        num_comp = 0,
        max_elems = [];

    if (!arg2) {
        s1 = calc_shape(arg1);
        ar1 = flatten(arg1);
        for (let i = axis; i < s1.length; i++) {
            inc *= s1[i];
            jump_len *= s1[i];
        }
        jump_len /= s1[axis];
        num_comp = axis < s1.length - 1 ? s1[s1.length - 1] : s1[s1.length - 2];
        console.log(jump_len, inc, switches, num_comp);

        for (let i = 0; i < (ar1.length - jump_len); i++) {
            console.log(`i = ${i}`);
            max = ar1[i];
            for (let j = 0; j < s1[axis] - 1; j++) {
                console.log(`comparison no. = ${j}`);
                console.log(`comparing arr[${i}] = ${ar1[i]} and arr[${i + ((j + 1) * jump_len)}] = ${ar1[i + ((j + 1) * jump_len)]}`);
                if (ar1[i + ((j + 1) * jump_len)] > max) max = ar1[i + ((j + 1) * jump_len)];
                console.log(max);
            }
            max_elems.push(max);
            console.log(`the max array is now , ${max_elems}`);
            if ((i - 1) % num_comp === 0) {
                i += (inc * axis * switches) - 1; //// Here's The error The Value of i will always be -1 if axis = 0
                switches++;
                console.log(`i after jumping = ${i}`);
            }
        }

        return max_elems;
    }

    // else if(Array.isArray(arg1) && Array.isArray(arg2)){

    // }
}

module.exports = max;