const Benchmark = require('benchmark'),
    { ndarray, math, core } = require('./vecto'),
    Suite1 = new Benchmark.Suite;

let sample = 0;

function prepare(type) {
    let r1 = parseInt(Math.random() * 100) || 1,
        c1 = parseInt(Math.random() * 100) || 1,
        r2 = c1,
        c2 = parseInt(Math.random() * 100) || 1;
    this.shapes = [
        [r1, c1],
        [r2, c2]
    ];
    if (type === 'normal') {
        let [r1, c1] = this.shapes[0], [r2, c2] = this.shapes[1];
        let ar1 = new ndarray([r1, c1]),
            ar2 = new ndarray([r2, c2]),
            sa1 = [];
        for (let i = 0; i < r1; i++) {
            let sr = [];
            for (let j = 0; j < c2; j++) {
                sr[j] = 0;
            }
            sa1.push(sr);
        }
        return [r1, c1, r2, c2, ar1.array, ar2.array, sa1];
    } else {
        let [r1, c1] = this.shapes[0], [r2, c2] = this.shapes[1],
            ar1 = new ndarray([r1, c1]),
            ar2 = new ndarray([r2, c2]);
        return [r1, c1, r2, c2, ar1.array, ar2.array];
    }
}

Suite1.add('normal matrix multiplication', () => {
        let [r1, c1, r2, c2, ar1, ar2, sa1] = prepare('normal');
        for (let i = 0; i < r1; i++) {
            for (let j = 0; j < c2; j++) {
                for (let k = 0; k < c1; k++) {
                    sa1[i][j] += ar1[i][k] * ar2[k][j];
                }
            }
        }
    })
    .add('Single Loop algo', () => {
        let [r1, c1, r2, c2, ar1, ar2] = prepare('1d');
        const matmul = require('./util/matmul');
        matmul([r1, c1], [r2, c2], ar1, ar2);
    })
    .on('cycle', (e) => {
        console.log(`sample${sample++}`);
    })
    .on('complete', () => {
        console.log(`fastest : ${this.filter('fastest').map('name')}`);
    })
    .run({ async: true });