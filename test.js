const { Vector,sum,product } = require("./vecto");

let v = Vector.zeroes([2]);
console.log(v);

let v2 = Vector.zeroes([2,3]);
console.log(v2);
console.log(v2.size);
let v3 = new Vector([6]);
v3.arrange();
let sm = Vector.add(v2,v3);
console.log(sm);