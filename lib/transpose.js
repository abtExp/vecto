/* function to find the transpose */
module.exports = function transpose(arr) {
    const calc_shape = require('./calc_shape'),
    flatten = require('./flatten'),
    form_arr = require('./form_arr'),
    arrange = require('./arrange'),
    
    s = calc_shape(arr);
    let flat_arr = [];
    flatten(arr,flat_arr);
    let t = form_arr(flat_arr),
    r = s.length > 1 ? s[0] : 1, c = s.length > 1 ? s[1] : s[0], k=0,
    b = [];
    for(let i=0; i<c; i++){
        for(let j=i; j<t.length; j+=c){
            console.log(t[j]);
            b[k++] = t[j];
        }
    }
    let final = form_arr(b);
    return arrange([c,r],final);
}
