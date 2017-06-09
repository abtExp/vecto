const { Vector,sum,product } = require("./vecto");

/* Tests for creation of Vector */

// : constructor(?shape[],?array[])

//case 1 : constructor(shape,arr)
let v1 = new Vector([2,3],[[1,2,3],[4,5,6]]);
console.log(v1);

//case 2 : constructor(shape)
let v2 = new Vector([2,3]);
console.log(v2);
// at this point the array and flat for v2 are empty arrays,
// you've to call this.arrange() explicitly.

//case 3 : constructor(array)
let v3 = new Vector([],[[1,2,3],[4,5,6]]);
console.log(v3);

//case 4 : constructor()
let v4 = new Vector();
console.log(v4);


//: Vector.array(array)

let v5 = Vector.array([[1,2,3],[4,5,6]]);
console.log(v5);

//: Vector.zeroes(shape)

let v6 = Vector.zeroes([2,3]);
console.log(v6);



/* Tests for Vector.flatten(ndarr,target_arr) */



/* Tests for Vector_object.arrange(?elems_arr,?fill_style) */



/* Tests for product(arr1,arr2)*/



/* Tests for sum(arr1,?arr2) */



/* Tests for Vector.add(v2) */



/* Tests for Vector_object.resize(new_shape[]) */



/* Tests for Vector_object.reshape(new_shape[]) */



/* Tests for Vector.fill(len,fill_style,...args) */
let ta = Vector.fill(8);
console.log(ta);
ta = Vector.fill(8,"linear",1);
console.log(ta);
ta = Vector.fill(8,"linear",0.1,0.9,0.1);
console.log(ta);
ta = Vector.fill(8,"linear",10,20);
console.log(ta);
ta = Vector.fill(8)