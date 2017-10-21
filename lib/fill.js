/* fills the vector according to passed args
 * 
 *    function prototype :
 *             fill(len = number, fill_style = 'String', dist = 'String', ...args)
 *             @len : number : Required ( The length of the array to be filled )
 *           ? @fill_style : 'String' : The type of elements to be filled
 *                                      { 
 *                                        1. 'linear' : Number entries
 *                                        2. 'array' : Array entries
 *                                        // Defaults to 'linear'
 *                                      }
 *           ? @dist : 'String' : The distribution for elements to be filled
 *                                {
 *                                  1. 'unif' : Uniform distribution between provided range
 *                                  2. 'gaussian' : Gaussian distribution with given mean and stddev
 *                                  // Defaults to 'unif'
 *                                }
 *           ? @...args : Rest Params : If args.length === 0
 *                                          fill random uniform distribution
 *                                         args.length === 1
 *                                          fill with the provided value
 *                                         args.length === 2
 *                                          fill with the values in the provided range
 *                                         args.length === 3
 *                                          fill values in the range args[0]-args[1] with increments of args[2]
 * 
 *  Returns : [number] : The filled array
 */

// :construction: Under Maintainence :construction: \\

module.exports = function fill(len, fill_style = 'linear' /*,dist = 'unif'*/ , ...args) {
    // Random Uniform Distribution : Math.random() * (b - a) + a;

    // Gaussian Distribution : 
    // function (mean = 0, stdDev = 1, trunc = false){
    //     let var1, var2, std;
    //     var1 = 2 * Math.random() - 1;
    //     var2 = 2 * Math.random() - 1;
    //     std = var1^2 + var2^2;
    //     while (std > 1){
    //          var1 = 2 * Math.random() - 1;
    //          var2 = 2 * Math.random() - 1;
    //          std = var1^2 + var2^2;
    //     }

    //     const result = Math.sqrt(-2 * Math.log(std) / std) * var1;
    //     if (trunc && result > 2) {
    //       return randGauss(mean, stdDev, true);
    //     }
    //     return mean + stdDev * result;
    //   }
    const arr = [];
    let i;
    if (!args || args.length === 0) {
        for (i = 0; i < len; i++) {
            arr[i] = Math.random();
        }
    } else {
        if (args.length === 1) {
            if (Array.isArray(args[0]) && fill_style === "array") {
                for (i = 0; i < len; i++) {
                    arr[i] = args[0];
                }
            } else if (Array.isArray(args[0]) && fill_style === "linear") {
                let j = 0;
                for (i = 0; i < len; i++) {
                    arr[i] = args[0][j++];
                    if (j >= args[0].length) {
                        j = 0;
                    }
                }
            } else {
                for (i = 0; i < len; i++) {
                    arr[i] = args[0];
                }
            }
        } else {
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