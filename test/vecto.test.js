const { Ndarray, core, math } = require('../vecto');

function regMatMul(s1, s2, ar1, ar2) {
    let c = [];
    for (let i = 0; i < s1[0]; i++) {
        let ar = [];
        for (let j = 0; j < s2[1]; j++) {
            ar.push(0);
        }
        c.push(ar);
    }

    for (let i = 0; i < s1[0]; i++) {
        for (let j = 0; j < s2[1]; j++) {
            for (let k = 0; k < s2[0]; k++) {
                c[i][j] += ar1[i][k] * ar2[k][j];
            }
        }
    }

    return c;
}

// Ndarray tests
test('Ndarray construction method:1 (constructor)', () => {
    let n1 = new Ndarray({ shape: [2, 3], dtype: 'float32', initializer: 'zeros' });
    expect(n1).toBeInstanceOf(Ndarray) &&
        expect(n1).toEqual({
            shape: [2, 3],
            size: 6,
            dim: 2,
            dtype: 'float32',
            data: Float32Array[0, 0, 0, 0, 0, 0]
        })
});

test('Ndarray construction method:2 (zeroes)', () => {
    let n1 = Ndarray.zeroes([2, 3]);
    expect(n1).toBeInstanceOf(Ndarray) &&
        expect(n1).toEqual({
            shape: [2, 3],
            size: 6,
            dim: 2,
            dtype: 'uint8',
            data: Uint8Array
        });
})

test('Ndarray construction method:3 (array)', () => {
    let n1 = Ndarray.array([
        [
            [1, 2, 3],
            [4, 5, 6]
        ],
        [
            [7, 8, 9],
            [10, 11, 12]
        ]
    ]);

    expect(n1).toBeInstanceOf(Ndarray) &&
        expect(n1).toEqual({
            shape: [2, 2, 3],
            size: 12,
            dim: 3,
            dtype: 'uint8',
            data: Uint8Array
        })

})

test('NdarrayObject.arrange method', () => {
    let n1 = Ndarray.zeroes([2, 3]);
    n1.arrange([2]);
    expect(n1.val()).toEqual([
        [2, 2, 2],
        [2, 2, 2]
    ]);
})

test('NdarrayObject.resize method', () => {
    let n1 = new Ndarray({ shape: [2, 3, 4] });
    n1.arrange([1]);
    let oldval = n1.val();
    n1.resize([4, 4]);
    let newval = n1.val();
    console.log(oldval);
    console.log(newval);
    expect(core.calcShape(newval)).toEqual([4, 4]) &&
        expect(core.calcShape(oldval)).toEqual([2, 3, 4]);
})

test('NdarrayObject.reshape method', () => {
    let n1 = new Ndarray({ shape: [2, 3, 4] });
    n1.arrange([2]);
    let oldval = n1.val();
    n1.reshape([4, 6]);
    let newval = n1.val();

    expect(oldval).toEqual([
            [
                [2, 2, 2, 2],
                [2, 2, 2, 2],
                [2, 2, 2, 2]
            ],
            [
                [2, 2, 2, 2],
                [2, 2, 2, 2],
                [2, 2, 2, 2]
            ]
        ]) &&
        expect(newval).toEqual([
            [2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2],
            [2, 2, 2, 2, 2, 2]
        ]);
})


test('NdarrayObject.clip method', () => {
    let n1 = new Ndarray({ shape: [2, 3] });
    n1.arrange([12, 31, 11, 24, 2, 20]);
    expect(n1.val()).toEqual([
        [12, 31, 11],
        [24, 2, 20]
    ]);
    n1.clip(10, 20);
    expect(n1.val()).toEqual([
        [12, 20, 11],
        [20, 10, 20]
    ]);
})


test('NdarrayObject.flatten method', () => {
    let n1 = new Ndarray({ shape: [2, 3, 4] });
    n1.arrange([2]);
    expect(n1.data.toString()).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].toString());
})

test('NdarrayObject.transpose method', () => {
    let n1 = new Ndarray({ shape: [2, 3] });
    n1.arrange([1, 2, 3, 4, 5, 6])
    let nt = n1.transpose();
    expect(nt).toEqual([
        [1, 4],
        [2, 5],
        [3, 6]
    ]);
})


//core tests
test('core.arrange', () => {
    let a = core.arrange([2, 3], [2]);
    expect(a).toEqual([
        [2, 2, 2],
        [2, 2, 2]
    ]);
})

test('core.calcShape', () => {
    let a = [
        [
            [1, 2],
            [3, 4]
        ],
        [
            [5, 6],
            [7, 8]
        ]
    ];
    expect(core.calcShape(a)).toEqual([2, 2, 2]);
})

test('core.calcSize', () => {
    let a = [
        [1, 2, 3],
        [4, 5, 6]
    ];
    expect(core.calcSize(a)).toBe(6);
})

test('core.clip', () => {
    let a = [
        [12, 20, 10, 2],
        [4, 7, 10, 11]
    ];
    expect(core.clip(a, 10, 20)).toEqual([
            [12, 20, 10, 10],
            [10, 10, 10, 11]
        ]) &&
        expect(core.clip(a, [
            [14, 18, 12, 4],
            [5, 10, 10, 10]
        ], 20)).toEqual([
            [14, 20, 12, 4],
            [5, 10, 10, 11]
        ]) &&
        expect(core.clip(a, [
            [14, 18, 12, 4],
            [5, 10, 10, 10]
        ], [
            [18, 19, 12, 5],
            [6, 11, 11, 11]
        ])).toEqual([
            [14, 19, 12, 4],
            [5, 10, 10, 11]
        ]);
})


test('core.findDim', () => {
    let a = [
        [
            [1, 2, 3],
            [4, 5, 6]
        ],
        [
            [1, 2, 4],
            [53, 12, 12]
        ]
    ];
    expect(core.findDim(a)).toBe(3);
})

test('core.flatten', () => {
    expect(core.flatten([2, 3, 4])).toEqual([2, 3, 4]);
    expect(core.flatten([
        [1, 2, 3],
        [4, 5, 6]
    ])).toEqual([1, 2, 3, 4, 5, 6]);
    expect(core.flatten([
        [
            [1, 2],
            [3, 4]
        ],
        [
            [5, 6],
            [7, 8]
        ]
    ])).toEqual([1, 2, 3, 4, 5, 6, 7, 8]);
})


test('core.formChunks', () => {
    let arr = [1, 2, 2, 4, 5235, 2, 13, 156, 623, 622, 21, 61, 6, 126];
    let b = core.formChunks(4, 5, arr);
    expect(b).toEqual([
        [1, 2, 2, 4],
        [5235, 2, 13, 156],
        [623, 622, 21, 61],
        [6, 126, 1, 2],
        [2, 4, 5235, 2]
    ]);
})

test('core.transpose', () => {
    let a = [
        [12, 24, 2, 1],
        [2, 4, 1, 5]
    ];
    expect(core.transpose(a)).toEqual(
        [
            [12, 2],
            [24, 4],
            [2, 1],
            [1, 5]
        ]
    );
})

test('core.fill', () => {
    let a = core.fill([8, 1], 'linear', 1, 10);
    expect(a).toEqual([
        [1],
        [2],
        [3],
        [4],
        [5],
        [6],
        [7],
        [8]
    ]);
})

test('core.formArr', () => {
    let a = [1, 2, 4, 2366, 1241, 1, 3124, 1254, 15];
    let b = core.formArr(a, 'uint32');
    expect(a.constructor.name).toBe('Array') &&
        expect(b.constructor.name).toBe('Uint32Array');
})


// test for product method

test('product tests', () => {
    let shape11 = parseInt(Math.floor(Math.random() * 10)) || 1,
        shape12 = parseInt(Math.floor(Math.random() * 10)) || 1,
        shape21 = shape12,
        shape22 = parseInt(Math.floor(Math.random() * 10)) || 1,
        shape1 = [shape11, shape12],
        shape2 = [shape21, shape22],
        ar1 = new Ndarray({ shape: shape1, initializer: 'linear' }),
        ar2 = new Ndarray({ shape: shape2, initializer: 'linear' }),
        ar3 = new Ndarray({ shape: shape2, initializer: 'linear' }),
        prearr1 = ar1.val(),
        prearr2 = ar2.val(),
        prearr3 = ar3.val();
    console.log(shape1, shape2);
    expect(math.product(prearr1, prearr2, 'dot')).toEqual(regMatMul(shape1, shape2, prearr1, prearr2));
})

// test('sum test', () => {
//     let a = [
//             [1, 2, 4],
//             [5, 6, 7]
//         ],
//         b = [
//             [2, 4, 5],
//             [6, 2, 1]
//         ];

//     expect(math.sum(a, b)).toEqual([
//             [3, 6, 9],
//             [11, 8, 8]
//         ]) &&
//         expect(math.sum(a)).toEqual([7, 18]);
// })

test('log test', () => {
    let a = [
        [1, 2, 3],
        [4, 5, 6]
    ];
    expect(math.log(a)[0][0]).toEqual(Math.log(a[0][0]));
})

test('exp test', () => {
    let a = [
        [1, 2, 3],
        [4, 5, 6]
    ];
    let b = Math.exp(a[0][0]);
    expect(math.exp(a)[0][0]).toBe(b);
})

test('divide test', () => {
    let a = new Ndarray({ shape: [2, 3], initializer: 'linear' });
    let b = new Ndarray({ shape: [2, 3], initializer: 'linear' });

    let c = math.divide(a.val(), b.val());
    let d = [];
    a = Array.from(a.data);
    b = Array.from(b.data);

    for (let i = 0; i < a.length; i++) {
        d[i] = (a[i] / b[i]);
    }

    expect(core.flatten(c)).toEqual(d);
})

test('formArr', () => {
    let arr = [1, 2, 3];
    let a = core.formArr(arr, 'uint8');
    let b = core.formArr(arr, 'uint16');
    let c = core.formArr(arr, 'uint32');
    let d = core.formArr(arr, 'int8');
    let e = core.formArr(arr, 'int16');
    let f = core.formArr(arr, 'int32');
    let g = core.formArr(arr, 'float32');
    let h = core.formArr(arr, 'float64');
    let i = core.formArr(arr, 'uint8clamped');


    expect(a.constructor.name).toBe('Uint8Array') &&
        expect(b.constructor.name).toBe('Uint16Array') &&
        expect(c.constructor.name).toBe('Uint32Array') &&
        expect(d.constructor.name).toBe('Int8Array') &&
        expect(e.constructor.name).toBe('Int16Array') &&
        expect(f.constructor.name).toBe('Int32Array') &&
        expect(g.constructor.name).toBe('Float32Array') &&
        expect(h.constructor.name).toBe('Float64Array') &&
        expect(i.constructor.name).toBe('Uint8ClampedArray');
})

test('pad test', () => {
    // const a =   
})