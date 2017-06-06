const { Vector,sum,product } = require("./vecto");

let v = Vector.zeroes([2]);
console.log(v);

let v2 = Vector.zeroes([2,3]);
console.log(v2);
console.log(v2.size);
let v3 = new Vector([6]);
v3.arrange();
let sm = Vector.add(v2,v3); // Produces an uneven size error
console.log(sm);

let n2v = Vector.array([[4,2,1],[7,8,9]]);
// console.log(nv.calc_shape(nv.array));
// console.log(nv.calc_size(nv.shape));
// console.log(nv);

let tnv = new Vector([2,2,3,4]);
tnv.arrange(4);
console.log(tnv);
tnv.reshape([6,8]);
console.log(tnv);
n2v.reshape([6]);
console.log(`reshaped = `,n2v);
n2v.resize([5,5]);
console.log(`resized = `,n2v);

let nv = new Vector([2,3]);
nv.arrange(2);
console.log(nv.array);
let nv2 = new Vector([2,3]);
nv2.arrange(4);
console.log(nv2.array);
console.log(Vector.add(nv,nv2));

let nnv = new Vector([5,5]);
nnv.arrange(5);
console.log(nnv);

console.log(product(nnv.array,n2v.array));

let nvvn = new Vector([5,5]);
nvvn.arrange(6);

let nv22 = new Vector(nvvn.shape);
nv22.arrange(5);

console.log(product(nvvn.array,nv22.array));
console.log(sum(nvvn.array,nv22.array));
console.log(sum(nvvn.array));
console.log(product(nvvn.array,[2,2,2,2,2]));
console.log(product(nvvn.array,2));
