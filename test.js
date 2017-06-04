const { Vector,sum,product } = require("./vecto");

// let v = Vector.zeroes([2]);
// console.log(v);

// let v2 = Vector.zeroes([2,3]);
// console.log(v2);
// console.log(v2.size);
// let v3 = new Vector([6]);
// v3.arrange();
// let sm = Vector.add(v2,v3);
// console.log(sm);

// let nv = Vector.array([[4,2,1],[7,8,9]]);
// console.log(nv.calc_shape(nv.array));
// console.log(nv.calc_size(nv.shape));
// console.log(nv);

// nv.reshape([6,1]);
// console.log(nv);
// nv.resize([5,5]);
// console.log(nv);

let v = new Vector([6,2]);
v.arrange(2,"array");
console.log(v.array);
let v2 = new Vector([6,2]);
v2.arrange(4,"array");
console.log(v2.array);
console.log(Vector.add(v,v2).array);