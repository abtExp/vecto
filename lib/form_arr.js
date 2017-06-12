module.exports = function form_arr(arr,dtype='uint8'){
    let array;
    switch(dtype){
        case 'uint8':
            return new Uint8Array(arr);

        case 'uint16':
            return new Uint16Array(arr);

        case 'uint32':
            return new Uint32Array(arr);

        case 'int8':
            return new Int8Array(arr);
        
        case 'int16':
            return new Int16Array(arr);

        case 'int32':
            return new Int32Array(arr);

        case 'float32':
            return new Float32Array(arr);

        case 'float64':
            return new Float64Array(arr);

        case 'uint8clamped':
            return new Uint8ClampedArray(arr);

        default:
            return new Array(arr);
    }
}