const { Ndarray, core, math } = require('./vecto');

function regMatMul(s1, s2, ar1, ar2) {
    let c = [];
    for (let i = 0; i < s1[0]; i++) {
        let ar = [];
        for (let j = 0; j < s2[1]; j++) {
            ar.push(0);
        }
        c.push(ar);
    }

    ar1 = core.flatten(ar1);
    ar1 = core.form_arr(ar1, 'float32');
    ar1 = core.arrange(s1, ar1);
    ar2 = core.flatten(ar2);
    ar2 = core.form_arr(ar2, 'float32');
    ar2 = core.arrange(s2, ar2);

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
    let n1 = new Ndarray([2, 3]);
    expect(n1).toBeInstanceOf(Ndarray) &&
        expect(n1).toEqual({
            array: [],
            shape: [2, 3],
            size: 6,
            dim: 2,
            dtype: 'uint8',
            flat: Uint8Array
        });
});

test('Ndarray construction method:2 (zeroes)', () => {
    let n1 = Ndarray.zeroes([2, 3]);
    expect(n1).toBeInstanceOf(Ndarray) &&
        expect(n1).toEqual({
            array: [
                [0, 0, 0],
                [0, 0, 0]
            ],
            shape: [2, 3],
            size: 6,
            dim: 2,
            dtype: 'uint8',
            flat: Uint8Array
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
            array: [
                [
                    [Array],
                    [Array]
                ],
                [
                    [Array],
                    [Array]
                ]
            ],
            shape: [2, 2, 3],
            size: 12,
            dim: 3,
            dtype: 'uint8',
            flat: Uint8Array
        })

})

test('NdarrayObject.arrange method', () => {
    let n1 = Ndarray.zeroes([2, 3]);
    n1.arrange([2]);
    expect(n1.array).toEqual([
        [2, 2, 2],
        [2, 2, 2]
    ]);
})

test('NdarrayObject.resize method', () => {
    let n1 = new Ndarray([2, 3, 4]);
    n1.arrange([1]);
    let oldval = n1.array;
    n1.resize([4, 4]);
    let newval = n1.array;
    expect(newval).toEqual([
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1],
            [1, 1, 1, 1]
        ]) &&
        expect(oldval).toEqual([
            [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1]
            ],
            [
                [1, 1, 1, 1],
                [1, 1, 1, 1],
                [1, 1, 1, 1]
            ]
        ]);
})

test('NdarrayObject.reshape method', () => {
    let n1 = new Ndarray([2, 3, 4]);
    n1.arrange([2]);
    let oldval = n1.array;
    n1.reshape([4, 6]);
    let newval = n1.array;

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
    let n1 = new Ndarray([2, 3]);
    n1.arrange([12, 31, 11, 24, 2, 20]);
    expect(n1.array).toEqual([
        [12, 31, 11],
        [24, 2, 20]
    ]);
    n1.clip(10, 20);
    expect(n1.array).toEqual([
        [12, 20, 11],
        [20, 10, 20]
    ]);
})


test('NdarrayObject.flatten method', () => {
    let n1 = new Ndarray([2, 3, 4]);
    n1.arrange([2]);
    expect(n1.flat.toString()).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].toString());
})

test('NdarrayObject.transpose method', () => {
    let n1 = new Ndarray([2, 3]);
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

test('core.calc_shape', () => {
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
    expect(core.calc_shape(a)).toEqual([2, 2, 2]);
})

test('core.calc_size', () => {
    let a = [
        [1, 2, 3],
        [4, 5, 6]
    ];
    expect(core.calc_size(a)).toBe(6);
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


test('core.find_dim', () => {
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
    expect(core.find_dim(a)).toBe(3);
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


test('core.form_chunks', () => {
    let arr = [1, 2, 2, 4, 5235, 2, 13, 156, 623, 622, 21, 61, 6, 126];
    let b = core.form_chunks(4, 5, arr);
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

test('core.form_arr', () => {
    let a = [1, 2, 4, 2366, 1241, 1, 3124, 1254, 15];
    let b = core.form_arr(a, 'uint32');
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
        ar1 = new Ndarray(shape1),
        ar2 = new Ndarray(shape2),
        ar3 = new Ndarray(shape2),
        prearr1 = ar1.array,
        prearr2 = ar2.array,
        prearr3 = ar3.array;
    console.log(shape1, shape2);
    expect(math.product(prearr1, prearr2, 'matrix')).toEqual(regMatMul(shape1, shape2, prearr1, prearr2));
    // expect(math.product(prearr2, prearr3, 'dot')).toEqual(regMatMul(shape2, shape2, prearr2, prearr3));
})

test('sum test', () => {
    let a = [
            [1, 2, 4],
            [5, 6, 7]
        ],
        b = [
            [2, 4, 5],
            [6, 2, 1]
        ];

    expect(math.sum(a, b)).toEqual([
            [3, 6, 9],
            [11, 8, 8]
        ]) &&
        expect(math.sum(a)).toEqual([7, 18]);
})

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
    let a = new Ndarray([2, 3]);
    let b = a.flat.map(i => (i / 2));
    let c = math.divide(Array.from(a.flat), 2);
    let d = new Ndarray([2, 3]);
    let e = Array.from(d.flat);
    let f = [];
    for (let i = 0; i < a.flat.length; i++) {
        f.push(a.flat[i] / e[i]);
    }
    let g = math.divide(Array.from(a.flat), e);
    // expect(b).toEqual(core.flatten(c));
    // expect(g).toEqual(core.flatten(f));
})

test('form_arr', () => {
    let arr = [1, 2, 3];
    let a = core.form_arr(arr, 'uint8');
    let b = core.form_arr(arr, 'uint16');
    let c = core.form_arr(arr, 'uint32');
    let d = core.form_arr(arr, 'int8');
    let e = core.form_arr(arr, 'int16');
    let f = core.form_arr(arr, 'int32');
    let g = core.form_arr(arr, 'float32');
    let h = core.form_arr(arr, 'float64');
    let i = core.form_arr(arr, 'uint8clamped');


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