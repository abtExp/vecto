[![Code Climate](https://codeclimate.com/github/AbT10/vecto/badges/gpa.svg)](https://codeclimate.com/github/AbT10/vecto)  [![Build Status](https://travis-ci.org/AbT10/vecto.svg?branch=master)](https://travis-ci.org/AbT10/vecto)  [![npm](https://badge.fury.io/js/vecto.svg)](https://badge.fury.io/js/vecto)
[![Coverage Status](https://coveralls.io/repos/github/AbT10/vecto/badge.svg?branch=master)](https://coveralls.io/github/AbT10/vecto?branch=master)

# vecto :construction: :sparkles: :art:

# A JavaScript Mini Library to deal with N-dimensional arrays.

## Installation

```shell
npm install vecto
```

### API 

```js
const vecto = require('vecto');
```

The vecto exports:
* ndarray
* sum
* product
* core

The ndarray provides a class to construct ndarrays and operate on them.

### Constructor

```js
let v1 = new ndarray(?[shape], ?[array], ?'dtype');
```

* Shape : Shape is the structure of the array, ex., shape of [2,3] means a 2x3 matrix having 2 array elements that have 3 elements each.
: type = array,
: value = optional,
: default = []

* Array : The Array that you want to create ndarray with.(if any).
: type = array,
: value = optional,
: default = []

* dtype : Defines the data type for the elements of the array. Possible values are : 'uint8','uint16','int8','int16','float32','float64' & 'uint8clamped'.

: type = string,
: value = optional,
: default = 'uint8'


##### Other Methods For creation 

* <b>ndarray.array([array])</b>

This Constructs an ndarray object for passed in array.

: return type = ndarray_object

ex : 
```js 
let v = ndarray.array([[1,2,3],[4,5,6]]);
```


* <b>ndarray.zeroes([shape])</b>

Constructs an ndarray object of given shape filled with placeholder 0's.

ex : 
```js
let zv = ndarray.zeroes([2,2,3]);
```

### ndarray properties and methods

#####  Properties

* this.shape :  It defines the structure of the ndarray.
: type = array.

* this.array :  Data of the ndarray.
: type = array.

* this.size : The total number of elements in the ndarray.
: type = int.

* this.dim : The Dimensions of the ndarray ( number of dimensions ).
: type = int.

* this.dtype : The Data type of the elements of the array, currently only numbers are supported.
: type = string.

* this.flat : 1-D version of the ndarray, stored as typed arrays, Faster operations can be performed on this.
: type = dtype array.


##### Methods

* <b> ndarray_object.resize([new_shape]) </b>

This Method is used to alter the shape of an already existing ndarray, The new shape in form of array is provided and the current ndarray object is rearranged according to this new shape.

ex :

```js
let nv = new ndarray([2,2,3],[[[5,5,5],[5,5,5]],[[5,5,5],[5,5,5]]],'float32');
// nv.array = [[[5,5,5],[5,5,5]],[[5,5,5],[5,5,5]]];
nv.resize([2,3]);
//nv.array = [[5,5,5],[5,5,5]]
```

* <b> ndarray_object.reshape([new_shape]) </b>

This method is used to rearrange an already existing ndarray object, The new shape in form of array is provided and the current ndarray object is rearranged only if the size for the new shape === the size for the old shape , i.e., the total number of elements in both configurations remain the same.

ex :

```js
let nv = new ndarray([2,2,3],[[[5,5,5],[5,5,5]],[[5,5,5],[5,5,5]]],'float32');
// nv.array = [[[5,5,5],[5,5,5]],[[5,5,5],[5,5,5]]];
nv.reshape([2,3]); // not possible
nv.reshape([6,2]);
//nv.array = [[5,5],[5,5],[5,5],[5,5],[5,5],[5,5]]
```

* <b> *ndarray_object.flatten() </b>

Creates 1-D form of the ndarray. * = called implicitly (don't need to call explicitly).


* <b> ndarray_object.arrange([array]) </b>

Arranges The passed in 1-d array according to the shape of the ndarray_object

ex : 

```js
let nv = new ndarray([2,3]);
nv.arrange([2]);
//nv.array = [[2,2,2],[2,2,2]]
nv.arrange([1,2]);
//nv.array = [[1,2,1],[2,1,2]]
nv.arrange([1,2,3,4,5,6,7]);
//nv.array = [[1,2,3],[4,5,6]]
```

* <b> ndarray_object.transpose() </b>

Performs transpose operation on 2d ndarrays (nd not supported yet) and returns the transposed array.<br />
: return type = array.

ex : 

```js
let nv = new ndarray([2,3]);
nv.arrange([1,2,3,4,5,6]);
//nv.array = [[1,2,3],[4,5,6]]
console.log(nv.transpose())
//[[1,4],[2,5],[3,6]]
```


### Product

Method to perform different multiplication operations on different ndarrays.

<b> Function signature </b>

```js
product([arg1],[arg2],mode='string');
```
<b> return type : array</b>

<b> Modes : </b>
* <b>dot</b> : Performs hadmard product or elementwise product on the arrays.

ex : 

```js
let a = [[1,2,3],[4,5,6]],
b = [[10,20,30],[10,10,10]]

console.log(product(a,b,'dot'));
// [[10,40,90],[40,50,60]]
**************************

let a = [[1,2,3],[4,5,6],[2,4,6]],
b = [2,4,5];
console.log(product(a,b,'dot'));
//[[2,4,6],[16,20,24],[10,20,30]]

**************************

let a = [1,2,3],
b = [1,2,3];
console.log(product(a,b,'dot'));
//[1,4,9]

**************************
```
See test file for all test cases.


* <b> Matrix </b>

Performs Matrix multiplication


### Sum

Performs addition on two ndarrays.


### Core

The core object exports all the methods to normal arrays instead of just ndarray objects.

Methods provided by the core are : 

* ##### core.arrange([shape],[array])

Takes in the shape of the ndarray in which the passed elements are to be arranged.

ex : 
```js
let elems_arr = [1,2,3,4,5,6,7,8,9,10];
let nd = core.arrange([2,5],elems_arr);
//nd = [[1,2,3,4,5],[6,7,8,9,10]]
```

* ##### core.calc_shape([array])

Takes in an array and outputs the shape(configuration) of that array.

ex :
```js
let ar = [[[1,2],[4,5]],[[2,3],[6,7]],[[7,8],[9,1]]],
shape = core.calc_shape(ar);
//shape = [3,2,2];
```

* ##### core.calc_size([shape])

Takes in a shape and calculates the size of the ndarray.

ex :
```js
let shape = [4,5];
console.log(core.calc_size(shape));
//20
```

* ##### core.find_dim([shape])

Return the dimension of the array


* ##### core.flatten([array],[target_array])

Takes in an ndarray and an empty array.
Return the flattened version(1d) version of ndarray in the target array.

* ##### core.form_chunks(size,number,[array])

size : The Size of a chunk.
number : the number of chunks to be formed
array : The array from which the chunks will be formed.

ex :
```js
let ar = [1,2,3,4,5];
console.log(core.form_arr(2,2,ar));
//[[1,2],[3,4]]

let br = [[1,2,3],[4,5,6],[7,8,9]];
console.log(core.form_chunks(2,2,br));
//[[[1,2,3],[4,5,6]],[[7,8,9],[1,2,3]]]
```

* ##### core.transpose([arr],dtype='string')

Performs transpose operation on passed array.




@abt10

