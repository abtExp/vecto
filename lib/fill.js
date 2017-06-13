/* fills the vector acc to passed args */
module.exports = function fill(len, fill_style = "linear", ...args) {
    const arr = [];
    let i;
    if (!args || args.length === 0) {
        for (i = 0; i < len; i++) {
            arr[i] = Math.random();
        }
    }
    else {
        if (args.length === 1) {
            if (Array.isArray(args[0]) && fill_style === "array") {
                for (i = 0; i < len; i++) {
                    arr[i] = args[0];
                }
            }
            else if (Array.isArray(args[0]) && fill_style !== "array") {
                let j = 0;
                for (i = 0; i < len; i++) {
                    arr[i] = args[0][j++];
                    if (j >= args[0].length) {
                        j = 0;
                    }
                }
            }
            else {
                for (i = 0; i < len; i++) {
                    arr[i] = args[0];
                }
            }
        }
        else {
            let min = args[0],
                max = args[1],
                step = (args.length === 3) ? args[2] : 1,
                num = min;
            for (i = 0; i < len; i++) {
                arr[i] = parseFloat((num).toPrecision(2));
                num += step;
                if (num > max) {
                    num = min;
                }
            }
        }
    }
    return arr;
}