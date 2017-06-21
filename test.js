const { ndarray,sum,product,core } = require("./vecto");

/* Tests for creation of ndarray */

//: constructor(?shape[],?array[])

//case 1 : constructor(shape,arr)
let v1 = new ndarray([2,3],[[1,2,3],[4,5,6]]);
console.log(v1);
//Expected output : v1 = { array:[[1,2,3],[4,5,6]], dim:2, shape:[2,3], size:6, flat:[1,2,3,4,5,6] };

//case 2 : constructor(shape)
let v2 = new ndarray([2,3]);
console.log(v2);
//Expected output : v2 = { array:[], dim:2, shape:[2,3], size:6, flat:[] }
// at this point the array and flat for v2 are empty arrays,
// you've to call this.arrange() explicitly.

//case 3 : constructor(array)
let v3 = new ndarray([],[[1,2,3],[4,5,6]]);
console.log(v3);
//Expected output : v3 = { array:[[1,2,3],[4,5,6]], dim:2, shape:[2,3], size:6, flat:[1,2,3,4,5,6] }

//case 4 : constructor()
let v4 = new ndarray();
console.log(v4);
//Expected output : v4 = { array:[], dim:1, shape:[], size:0, flat:[] }


//: ndarray.array(array)

let v5 = ndarray.array([[1,2,3],[4,5,6]]);
console.log(v5);
//Expected output : v5 = { array:[[1,2,3],[4,5,6]], dim:2, shape:[2,3], size:6, flat:[1,2,3,4,5,6] }


//: ndarray.zeroes(shape)

let v6 = ndarray.zeroes([2,3]);
console.log(v6);
//Expected output : v6 = { array:[[0,0,0],[0,0,0]], dim:2, shape:[2,3], size:6, flat:[0,0,0,0,0,0,] }


/* Tests for ndarray.flatten(ndarr,target_arr) */
let v7 = [[[1,2,3],[4,5,6],[8,9,10]],[[2,3,4],[6,9,1],[4,5,2]],[[4,5,6],[1,4,1],[4,6,8]]];
let tar1 = [];
core.flatten(v7,tar1);
console.log(tar1);
//Expected output : [1,2,3,4,5,6,8,9,10,2,3,4,6,9,1,4,5,2,4,5,6,1,4,1,4,6,8]


/* Tests for ndarray_object.arrange(?elems_arr,?fill_style) */

let v8 = new ndarray([2,2,3]);
console.log(v8.shape);
v8.array = core.arrange(v8.shape,[1,2,3,4,5,6,7]);
console.log(v8.array);

v8.array = core.arrange(v8.shape);
console.log(v8.array);

v8.array = core.arrange(v8.shape,[2]);
console.log(v8.array);

/* Tests for ndarray_object.resize(new_shape[]) */
let v9 = new ndarray([2,2,3]);
v9.array = core.arrange(v9.shape,[4]);
console.log(v9.array);
v9.resize([2,9,5]);
console.log(v9.array);

/* Tests for ndarray_object.reshape(new_shape[]) */
let v10 = new ndarray([2,3]);
v10.array = core.arrange(v10.shape);
console.log(v10.array);
v10.reshape([6,2]);
console.log(v10.array);


/* Tests for ndarray.fill(len,fill_style,...args) */

let v11 = core.fill(8);
console.log(v11);
//Expected output : [random array of length 8];

v11 = core.fill(8,"linear",1);
console.log(v11);
//Expected output : [1,1,1,1,1,1,1,1]

v11 = core.fill(8,"linear",0.1,0.9,0.1);
console.log(v11);
//Expected output : [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8] 

v11 = core.fill(8,"linear",10,20);
console.log(v11);
//Expected output : [10,11,12,13,14,15,16,17]


/* Tests for product(arr1,arr2)*/
let v12 = [[1,2,3],[3,4,1]],
v13 = [10,10,10];
console.log(product(v12,v13,'dot'));

let v14 = [[2,1,5],[6,7,8]];
console.log(product(v12,v14,'dot'));

let v15 = [2,3,4];
console.log(product(v13,v15));

// let v16 = [4,5,6,7,8];
// console.log(product(v12,v16));
// // Uneven Size

// let v17 = [[1,2],[4,5]];
// console.log(product(v12,v17));
//Uneven size

console.log(product(v12,4));


/* Tests for sum(arr1,?arr2) */

let v16 = [1,2,3],
v17 = [4,5,6];
console.log(sum(v16));
console.log(sum(v16,v17));
let v18 = [[2,3,4],[4,5,7]];
console.log(sum(v18));
let v19 = [[1,2,2],[2,3,4]];
console.log(sum(v18,v19));


/* Test for transpose */

let a = [[1,2,3],[4,5,6],[7,8,9]];
console.log(core.transpose(a));
let b = [1,2,3];
console.log(core.transpose(b));
console.log(core.calc_shape(b));
console.log(core.calc_shape(core.transpose(b)));


/* Test for form_arr */
let ta = [[[1,2,3,4],[5,6,7,8]],[[2,4,5,6],[24,51,61,16]]];
let tb = [];
core.flatten(ta,tb);
console.log(core.form_arr(tb));

/* Tests for form_chunks */
let ab = [1,2,3,4,5,6,7,8,9];
console.log(core.form_chunks(3,3,ab));
