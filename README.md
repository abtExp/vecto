[![Code Climate](https://codeclimate.com/github/abtExp/vecto/badges/gpa.svg)](https://codeclimate.com/github/abtExp/vecto)  [![Build Status](https://travis-ci.org/abtExp/vecto.svg?branch=master)](https://travis-ci.org/abtExp/vecto)  [![npm](https://badge.fury.io/js/vecto.svg)](https://badge.fury.io/js/vecto)
[![Coverage Status](https://coveralls.io/repos/github/abtExp/vecto/badge.svg?branch=master)](https://coveralls.io/github/abtExp/vecto?branch=master)

# vecto :construction: :sparkles: :art:

# A JavaScript Mini Library to deal with N-dimensional arrays.


## <b> What's new </b>
* <a href='#clip'>clip</a> method
: Clip the values of the ndarray according to the passed max and min values.

* Fixing the product method
: Fixes to the product, every build till now had a logical error.

* Matrix Multiplication

* Fixed the flatten method (see the <a href='#flatten'>new docs</a>)


## <b>Upcoming</b>
* choose method for selective ndarray formation.

<br />
<br />
<br />
<br />

## Installation

```shell
npm install vecto
```

### API 

```js
const vecto = require('vecto');
```


### Function List : 

* <a href='#arrange'>arrange</a> : Form ndarray of given array in provided shape
* <a href='#calc_shape'>calc_shape</a> : Find the shape of an array
* <a href='#calc_size'>calc_size</a> : Calculate the size of the ndarray
* <a href='#choose'>choose</a> : Form new ndarray of given ndarray by choosing some dimensions only
* <a href='#clip'>clip</a> : Clip the array elements into a given range
* <a href='#fill'>fill</a> : fill in arrays by providing a range of elements or an element or by random numbers.
* <a href='#find_dim'>find_dim</a> : find the dimension of the array.
* <a href='#flatten'>flatten</a> : convert ndarray into 1d array.
* <a href='#form_chunks'>form_chunks</a> : form chunks by providing the number and size of chunks to be formed.
* <a href='#transpose'>transpose</a> : transpose of arrays.


<br />
<br />

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


### <p id='product'>Product</p>

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


### <p id='sum'>Sum</p>

Performs addition on two ndarrays.


### Core

The core object exports all the methods to normal arrays instead of just ndarray objects.

Methods provided by the core are : 

<p id='arrange'></p>

* ### core.arrange([shape],[array])

Takes in the shape of the ndarray in which the passed elements are to be arranged.

ex : 
```js
let elems_arr = [1,2,3,4,5,6,7,8,9,10];
let nd = core.arrange([2,5],elems_arr);
//nd = [[1,2,3,4,5],[6,7,8,9,10]]
```

<p id='calc_shape'></p>

* ### core.calc_shape([array])

Takes in an array and outputs the shape(configuration) of that array.

ex :
```js
let ar = [[[1,2],[4,5]],[[2,3],[6,7]],[[7,8],[9,1]]],
shape = core.calc_shape(ar);
//shape = [3,2,2];
```


<p id='calc_size'></p>

* ### core.calc_size([shape])

Takes in a shape and calculates the size of the ndarray.

ex :
```js
let shape = [4,5];
console.log(core.calc_size(shape));
//20
```

<p id='clip'></p>

* ### clip([array],^min_val/[min_val],^max_val/[max_val])

Makes the array elements contained in a limit provided as 
min_val and max_val.

[array] : the array to be clipped.
min_val/[min_val] : the minimum limit for the data in the array.
if provided as array, it's shape should match the shape of the provided array, with every element of the [min_val]describing the min val for the respective element of the provided array. 

max_val/[max_val] : the maximum limit for the data in the array.
if provided as array, it's shape should match the shape of the provided array, with every element of the [max_val]describing the max val for the respective element of the provided array. 

( ^ = only one of min_val or max_val could be null.)

example : 
```js

let a = [[10,24,12,3],[7,1,20,9]];
clip(a,10,12);
// returns [[10,12,12,10],[10,10,12,10]]

clip(a,[[10,12,14,4],[8,0,10,10]],[[12,20,20,31],[10,1,10,10]]);
//returns [ [ 10, 20, 14, 4 ], [ 8, 1, 10, 10 ] ]

clip(a,[[10,12,14,4],[8,0,10,10]],2);
//returns [ [ 2, 2, 14, 4 ], [ 8, 1, 2, 10 ] ]
```

<p id='find_dim'></p>

* ### core.find_dim([shape])

Return the dimension of the array


<p id='flatten'></p>

* ### core.flatten([array])

Takes in an ndarray.
Return the flattened version(1d) version of ndarray.

example : 
```js

let a = [[[1,2],[3,4]],[[5,6],[7,8]]];
core.flatten(a);
//returns [1,2,3,4,5,6,7,8];

```

<p id='form_chunks'></p>

* ### core.form_chunks(size,number,[array])

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

<p id='transpose'></p>

* ### core.transpose([arr],dtype='string')

Performs transpose operation on passed array.




<a href='https://github.com/abtExp'>@abtExp</a>

