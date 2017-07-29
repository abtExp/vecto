const { ndarray, core, product, sum } = require('./vecto');

// ndarray tests
test('ndarray construction method:1 (constructor)', () => {
    let n1 = new ndarray([2, 3]);
    expect(n1).toBeInstanceOf(ndarray) &&
        expect(n1).toEqual({
            array: [],
            shape: [2, 3],
            size: 6,
            dim: 2,
            dtype: 'uint8',
            flat: Uint8Array
        });
});

test('ndarray construction method:2 (zeroes)', () => {
    let n1 = ndarray.zeroes([2, 3]);
    expect(n1).toBeInstanceOf(ndarray) &&
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

test('ndarray construction method:3 (array)', () => {
    let n1 = ndarray.array([
        [
            [1, 2, 3],
            [4, 5, 6]
        ],
        [
            [7, 8, 9],
            [10, 11, 12]
        ]
    ]);

    expect(n1).toBeInstanceOf(ndarray) &&
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

test('ndarrayObject.arrange method', () => {
    let n1 = ndarray.zeroes([2, 3]);
    n1.arrange([2]);
    expect(n1.array).toEqual([
        [2, 2, 2],
        [2, 2, 2]
    ]);
})

test('ndarrayObject.resize method', () => {
    let n1 = new ndarray([2, 3, 4]);
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

test('ndarrayObject.reshape method', () => {
    let n1 = new ndarray([2, 3, 4]);
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


test('ndarrayObject.clip method', () => {
    let n1 = new ndarray([2, 3]);
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


test('ndarrayObject.flatten method', () => {
    let n1 = new ndarray([2, 3, 4]);
    n1.arrange([2]);
    expect(n1.flat.toString()).toEqual([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2].toString());
})

test('ndarrayObject.transpose method', () => {
    let n1 = new ndarray([2, 3]);
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
    let a = core.fill(8, 'linear', 0.1, 1.0, 0.1);
    expect(a).toEqual([0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8]);
})

test('core.form_arr', () => {
    let a = [1, 2, 4, 2366, 1241, 1, 3124, 1254, 15];
    let b = core.form_arr(a, 'uint32');
    expect(a.constructor.name).toBe('Array') &&
        expect(b.constructor.name).toBe('Uint32Array');
})


// test for product method

test('product tests', () => {
    let a = [
            [1, 2, 3],
            [4, 5, 6]
        ],
        b = [2, 4],
        c = [10, 12, 14];
    expect(product(a, b)).toEqual([
            [2, 4, 6],
            [16, 20, 24]
        ]) &&
        expect(product(a, c, 'dot')).toEqual([
            [10, 24, 42],
            [40, 60, 84]
        ]) &&
        expect(product(a, a, 'dot')).toEqual([
            [1, 4, 9],
            [16, 25, 36]
        ]) &&
        expect(product(c, [2, 4, 5])).toEqual([20, 48, 70]) &&
        expect(product(a, 5)).toEqual([
            [5, 10, 15],
            [20, 25, 30]
        ]) &&
        expect(product(5, a)).toEqual([
            [5, 10, 15],
            [20, 25, 30]
        ]);
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

    expect(sum(a, b)).toEqual([
            [3, 6, 9],
            [11, 8, 8]
        ]) &&
        expect(sum(a)).toEqual([7, 18]);
})