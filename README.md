[![Code Climate](https://codeclimate.com/github/AbT10/vecto/badges/gpa.svg)](https://codeclimate.com/github/AbT10/vecto)  [![Build Status](https://travis-ci.org/AbT10/vecto.svg?branch=master)](https://travis-ci.org/AbT10/vecto)  [![npm](https://badge.fury.io/js/vecto.svg)](https://badge.fury.io/js/vecto)
[![Coverage Status](https://coveralls.io/repos/github/AbT10/vecto/badge.svg?branch=master)](https://coveralls.io/github/AbT10/vecto?branch=master)

# vecto :construction: :sparkles: :art:
Dealing with N-dimensional Arrays and Vectors....<br />
<h6>Note : It's still a work in progress...</h6>

# The Use Cases

* Machine Learning Requires computing mostly in terms of multi-dimensional vectors and arrays.
* Complex matrix and array calculations.
* Simplifying the complex array operations.
* Image Processing.
* Text Processing.


# Inspiration 

<p>
The <b>Numpy ndarray</b> object is very powerful for performing complex array operations... Unfortunately it's not available for our lovely js.
I'm trying to implement Machine Learning Algorithms in Javascript, Learning and implementing on the go...
So to simplify some code and easily perform the operations i tried to somewhat mimic the numpy ndarray.
Although it's not that advanced yet, but soon it will be...
</p>

# Usage

<h2><b> The Exported Object </b></h2>

<p> When you import the script with - </p>

```js
var vector = require('vecto');
```

it returns an object with three elements : 

```js
{
Vector : Vector,
sum : sum,
product : product
}
```

<h1><b> The Vector object </b></h1>

<p> This is the main object, It's basically a class to define a vector or an n-dimensional array.
<br />
you can create a new <b>vector</b> or <b>n-dimensional array</b> by : 
</p>

```js
var vect = new Vector(args);
```


<h3> <b> The args </b></h3>
<p>
The constructor recieves two parameters : <br />
1. The Shape of the vector.
2. The array itself or the elements of the array or n-dimensional vector.

Although the arguments can be left empty and the Vector object will be initialised with an empty array as the array property and an empty array as the shape.

You can always change or alter the properties via the Vector methods.

</p>

The constructed object for a 2-dimensional array with shape ``` [2,3] ``` 
(meaning 2 elements having 3 elements each)
and the array ``` [[1,2,3],[4,5,6]] ``` looks like this : <br /><br />
```js
Object { array: Array[2], 
shape: Array[2], 
size: 6, 
dim: 2, 
flat: Array[6] 
}
```

<h2><b>The Properties of the Vector Object</b></h2>

A Vector Object Has the following properties : <br />
<br />
<h3><b>Shape</b></h3>

Defines The Structure of the array, i.e., the number of layers inside the array that defines the number of elements and if that element is itself an array, the number of elements inside it.
As seen in the above example for the shape ``` [2,3]``` The array was a 2-d array with 2 elements(arrays) having 3 elements each.

<h3><b>Array</b></h3>

The array itself, containig the data.

<h3><b>Dimension(dim)</b></h3>

The Dimension of the array. For the above case : ``` dim = 2 ```

<h3><b>Size</b></h3>

The total number of elements(scalar) in the n-dimension array

<h3><b>flat</b></h3>

It's the 1-d version of the n-dimensional array.

***************************************************************************************************************************************

<h1><b> The Methods </b></h1>
....................................

<h2><b>Static Methods</b></h2>

<h3><b>Different Creation Methods</b></h3>

<h4>From An Array</h4>

If you have an array of data that you want to turn into a Vector Object, you can either use the
constructor for passing in the array or the static method
```js
Vector.array(array)
```

This will return a new Vector object with the array property equal to the array you passed in.

example : 
```js
var array = [[2,3,4],[1,5,7]];
var v = Vector.array(array);
```

<h4>Zeroes</h4>

You can create a placeholder n-dimensional array for vector filled with zeroes by calling
```js
Vector.zeroes(shape)
```

example :
```js
var v = Vector.zeroes([2,3]);
```

v has the array property as : [[0,0,0],[0,0,0]]
<h4>the <b>fill</b> method</h4>

This is used by the <b>arrange</b>method of the Vector object to fill in the array of the Vector.
But it can be used to manually assign the array property.

The fill methods recieves two arguments : 1. Length of the array to be filled.
                                          2. Optional arguments to make the array.

example :

```js
var v = new Vector([2,3]);
var array = Vector.fill(6);
```

<i>if fill is called without passing the second parameter, it will return an array of length = passed length of random numbers   </i>

```js
var v = new Vector([2,3]);
var array = Vector.fill(6,[2,12,323,12,11,0]);
```

<i> Returns the array of passed array</i>

```js
var array = Vector.fill(6,1);
```

<i>Returns an array of length 6 with all elements = 1;</i>

```js
var array = Vector.fill(6,2,10);
```
<i>Returns an array of length 6 with elements in range 2 to 10.</i>

<h4>add</h4>

Used to add two Vector objects,returns a new Vector object.


```js
Vector.add(v1,v2);
```

<h4>Flatten</h4>

Turns ndarray into 1d array. Pass in the ndarray as the first argument, and an empty array as the second argument,
the flattened array is stored in the second argument.

```js
Vector.flatten(ndarr,emptArr);
```

<h4>calc_shape(arr)</h4>

Calculates the shape(structure) of the passed in array.

```js
const arr = [[[1,2,3],[4,5,6]],
             [[2,4,2],[1,2,1]]]

console.log(Vector.calc_shape(arr)); // [2,2,3]
```

<h4>calc_size</h4>

Calculates the size (total elements) of the array.

```js

const arr = [[3,4,1,2],
             [3,1,4,4],
             [5,6,2,1]]

console.log(Vector.calc_size(arr)); // 12
```


<h2>Other Methods</h2>

* find_dim(); // Returns the dimension of the Vector/ndarray.
* arrange(new_array,fill_style?); // Pass in a 1d array and it arranges it in the ndarray.
* reshape(new_shape,fill_style?); // Change the shape of the array iff size for new_shape == size for old_shhape.
* resize(new_shape,fill_style?); // Change the shape irrespective of size.

--- Note : The fill_style arg is currently experimental and is used for different array arrangements. For use, see the test.js file.


.............................................................................................

<h1><b>Product</b></h1>
:construction::hammer::hankey:
A function to perform any type of product operations on arrays of any dimension.

```js

const ar1 = [[2,3,4],
             [1,2,3]],
      ar2 = [5,5,5];

console.log(product(ar1,ar2));
```
product : test cases : 
* 1 [a,b,c] * [x,y,z]  // equal length 1-d arrays
* 2 [a,b,c] * [x,y]  // unequal length, must result in an uneven size error
* 3 [a,b,c] * [x] || [a,b,c] * x  // if length of arg2 is 1 or if arg2 is scalar
* 4 [[a,b,c],[d,e,f],[g,h,i]] * [a,b]  //arg1 is n-d but len(arg1) !== len(arg2), uneven size err
* 5 [[a,b,c],[d,e,f]] * [x,y,z]  // len(arg1) !== len(arg2) but len(arg1[i]) == len(arg2), must multiply arg2 with each arg[i]

:construction::hammer:


<h1><b>Sum</b></h1>
:construction::hammer::hankey:
A function to perform addition operations on arrays of any dimension.
:construction::hammer:

More To come :
* Matrix operations. :construction:
* Dtypes. :exclamation:
* Direct array access. :exclamation:

### Example :

in the test.js .

```js
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
```


*** Any help or suggestion is welcome. Write to me atworkstudios@gmail.com or @_thennable on twitter.






