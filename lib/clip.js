/* Clips the array ( converts elements according to max and min val passed )  
 *
 *   function prototype : 
 *          clip(array,min_val,max_val,out)
 *          @array : [number] : Required
 *          @min_val : number/[number] : Optional if max_val is provided
 *                                       if [number] is provided ,
 *                                       then ith val in [min_val] defines a min_val for 
 *                                       ith val in array.
 *          @max_val : number/[number] : Optional if min_val is provided,
 *                                       same as [min_val] but defines a max_val
 *          @out   : 'String' : The mode of output whether to generate a new op arr or modify the passed array
 */


 module.exports = function clip(arr,min_val,max_val){
    const flatten = require('./flatten');
    const arrange = require('./arrange');
    const calc_shape = require('./calc_shape');
     
    let a = [],min=[],max=[],a_shape = calc_shape(arr),f1=f2=false,k=l=0;
    flatten(arr,a);

    if(!min_val && !max_val) throw new Error('Expected atleast one clipping parameter');

    if(Array.isArray(min_val)){
        f1 = true;
        if(toString(calc_shape(min_val)) === toString(a_shape)){
            flatten(min_val,min);
        }
        else throw new Error('Uneven shape');
    }
    else{
        min[0] = min_val;
    }    

    if(Array.isArray(max_val)){
        f2 = true;
        if(toString(calc_shape(max_val)) === toString(a_shape)){
            flatten(max_val,max);
        }
        else throw new Error('Uneven shape');
    }
    else{
        max[0] = max_val;
    }

    for(let i=0; i<a.length; i++){
        if(a[i]<min[k]){
            a[i] = min[k];
        }        
        else if(a[i]>max[l]){
            a[i] = max[l];
        }
        if(f1) k++;
        if(f2) l++;
    }

    return (arrange(a_shape,a));
 }