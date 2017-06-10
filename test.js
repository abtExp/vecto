const { Vector,sum,product } = require("./vecto");

/* Tests for creation of Vector */

// : constructor(?shape[],?array[])

//case 1 : constructor(shape,arr)
let v1 = new Vector([2,3],[[1,2,3],[4,5,6]]);
console.log(v1);
//Expected output : v1 = { array:[[1,2,3],[4,5,6]], dim:2, shape:[2,3], size:6, flat:[1,2,3,4,5,6] };

//case 2 : constructor(shape)
let v2 = new Vector([2,3]);
console.log(v2);
//Expected output : v2 = { array:[], dim:2, shape:[2,3], size:6, flat:[] }
// at this point the array and flat for v2 are empty arrays,
// you've to call this.arrange() explicitly.

//case 3 : constructor(array)
let v3 = new Vector([],[[1,2,3],[4,5,6]]);
console.log(v3);
//Expected output : v3 = { array:[[1,2,3],[4,5,6]], dim:2, shape:[2,3], size:6, flat:[1,2,3,4,5,6] }

//case 4 : constructor()
let v4 = new Vector();
console.log(v4);
//Expected output : v4 = { array:[], dim:1, shape:[], size:0, flat:[] }


//: Vector.array(array)

let v5 = Vector.array([[1,2,3],[4,5,6]]);
console.log(v5);
//Expected output : v5 = { array:[[1,2,3],[4,5,6]], dim:2, shape:[2,3], size:6, flat:[1,2,3,4,5,6] }


//: Vector.zeroes(shape)

let v6 = Vector.zeroes([2,3]);
console.log(v6);
//Expected output : v6 = { array:[[0,0,0],[0,0,0]], dim:2, shape:[2,3], size:6, flat:[0,0,0,0,0,0,] }


/* Tests for Vector.flatten(ndarr,target_arr) */
let v7 = [[[1,2,3],[4,5,6],[8,9,10]],[[2,3,4],[6,9,1],[4,5,2]],[[4,5,6],[1,4,1],[4,6,8]]];
let tar1 = [];
Vector.flatten(v7,tar1);
console.log(tar1);
//Expected output : [1,2,3,4,5,6,8,9,10,2,3,4,6,9,1,4,5,2,4,5,6,1,4,1,4,6,8]


/* Tests for Vector_object.arrange(?elems_arr,?fill_style) */

let v8 = new Vector([2,2,3]);
v8.arrange([1,2,3,4,5,6,7]);
console.log(v8.array);

v8.arrange();
console.log(v8.array);

v8.arrange([2]);
console.log(v8.array);

/* Tests for product(arr1,arr2)*/



/* Tests for sum(arr1,?arr2) */



/* Tests for Vector.add(v2) */



/* Tests for Vector_object.resize(new_shape[]) */



/* Tests for Vector_object.reshape(new_shape[]) */



/* Tests for Vector.fill(len,fill_style,...args) */

let ta = Vector.fill(8);
console.log(ta);
//Expected output : [random array of length 8];

ta = Vector.fill(8,"linear",1);
console.log(ta);
//Expected output : [1,1,1,1,1,1,1,1]

ta = Vector.fill(8,"linear",0.1,0.9,0.1);
console.log(ta);
//Expected output : [0.1,0.2,0.3,0.4,0.5,0.6,0.7,0.8] 

ta = Vector.fill(8,"linear",10,20);
console.log(ta);
//Expected output : [10,11,12,13,14,15,16,17]
