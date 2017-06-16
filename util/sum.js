module.exports = function sum(arr1, arr2) {
    const calc_shape = require('../lib/calc_shape');
    const arrange = require('../lib/arrange');
    const form_arr = require('../lib/form_arr');
    const flatten = require('../lib/flatten');
    let summ,
    ta1 = [],
    ta2 = [],
    t1,t2,s1,s2;
    if(!arr2){
        flatten(arr1,ta1);
        t1 = form_arr(ta1);
        s1 = calc_shape(arr1);
        if(s1.length > 1){
            summ = [];
            let s = 0;
            for(let i=0; i<=t1.length; i++){
                if((i%s1[s1.length-1]) === 0 && i!== 0){ 
                    summ.push(s);
                    s = 0;
                }
                s+=t1[i];
            }
            return summ;    
        }
        else{
            summ = 0;
            for(let i=0; i<t1.length; i++){
                summ += t1[i];
            }
            return summ;
        }
    }
    else{
        flatten(arr1,ta1);
        flatten(arr2,ta2);
        t1 = form_arr(ta1);
        t2 = form_arr(ta2);
        s1 = calc_shape(arr1);
        s2 = calc_shape(arr2);
        if(s1.toString() === s2.toString()){
            summ = [];
            for(let i=0; i<t1.length; i++){
                summ[i] = t1[i]+t2[i];
            }
            let si = s1.length > 1 ? s1.slice(s1.length-2) : s1;
            return arrange(si,summ);
        }
        else{
            throw new Error("Uneven Size");
        }
    }
}