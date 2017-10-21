[![Codacy Badge](https://api.codacy.com/project/badge/Grade/18afea85bbb2469095c6df35638f5626)](https://www.codacy.com/app/atworkstudios/vecto?utm_source=github.com&utm_medium=referral&utm_content=abtExp/vecto&utm_campaign=badger)
[![Code Climate](https://codeclimate.com/github/abtExp/vecto/badges/gpa.svg)](https://codeclimate.com/github/abtExp/vecto)  [![Build Status](https://travis-ci.org/abtExp/vecto.svg?branch=master)](https://travis-ci.org/abtExp/vecto)  [![npm](https://badge.fury.io/js/vecto.svg)](https://badge.fury.io/js/vecto)
[![Coverage Status](https://coveralls.io/repos/github/abtExp/vecto/badge.svg?branch=master)](https://coveralls.io/github/abtExp/vecto?branch=master)
[![codecov](https://codecov.io/gh/abtExp/vecto/branch/master/graph/badge.svg)](https://codecov.io/gh/abtExp/vecto)

# vecto :construction: :sparkles: :art:

# A JavaScript Mini Library to deal with N-dimensional arrays.


## <b> What's new </b>

* Fixing the matrix multiplication method

## <b>Upcoming</b>
* max and min functions, choose function for axis operations

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
// for whole pkg
const vecto = require('vecto');

//selective 
const { ndarray, core, math } = require('vecto');
```


### Api List : 
* ##### <a href='#ndarray'>ndarray</a>
* ##### <a href='#core'>core</a>
* ##### <a href='#math'>math</a>



The ndarray provides a class to construct ndarrays and operate on them.


### <p id='ndarray'>ndarray</a>
##### Constructor

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


### <p id='math'>math</p>

Provides The Following functions :
* math.divide(arg1,arg2)
* math.exp(arg1)
* math.log(arg1)
* math.max(arg1,arg2,axis)
* math.min(arg1,arg2,axis)
* math.pow(arg1,pow)
* math.product(arg1,arg2,mode)
* math.sum(arg1,?arg2)

// Most of them are just wrappers around the normal Math class methods
<br />
* ##### math.product

```js
product([arg1],[arg2],mode='string');
```
<b> return type : array</b>

<b> Modes : </b>
* <b>dot</b> : Performs hadmard product or elementwise product on the arrays.
* <b>matrix</b> : Performs matrix multiplication


ex : 

```js
b = [[10,20,30],[10,10,10]]

console.log(product(a,b,'dot'));
// [[10,40,90],[40,50,60]]
**************************

let a = [[1,2,3],[4,5,6],[2,4,6]],
b = [2,4,5];
console.log(product(a,b,'dot'));
//[[2,4,6],[16,20,24],[10,20,30]]
console.log(product(a,b,'matrix'));
//[ [ 2, 4, 6 ], [ 16, 20, 24 ], [ 35, 40, 45 ] ]
**************************

let a = [1,2,3],
b = [1,2,3];
console.log(product(a,b,'dot'));
//[1,4,9]

**************************
```

* ##### math.sum

Performs addition on two ndarrays.


### <p id='core'>Core</p>

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


* ##### core.calc_size([array])

Takes in a array and calculates the size of the ndarray.

ex :
```js
let shape = [4,5];
console.log(core.calc_size(shape));
//20
```

* ##### clip([array],min_val/[min_val],max_val/[max_val])

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

* ##### core.find_dim([array])

Return the dimension of the array


* ##### core.flatten([array])

Takes in an ndarray.
Return the flattened version(1d) version of ndarray.

example : 
```js

let a = [[[1,2],[3,4]],[[5,6],[7,8]]];
core.flatten(a);
//returns [1,2,3,4,5,6,7,8];

```

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


<a href='https://github.com/abtExp'>@abtExp</a>

