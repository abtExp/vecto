module.exports = function sum(arr1, arr2) {
    let summ;
    if (!Array.isArray(arr1) && !Array.isArray(arr2)) {
        return arr1 + arr2;
    }
    else {
        if (!arr2) {
            if (Array.isArray(arr1[0])) {
                summ = arr1.map((i) => {
                    return sum(i);
                })
                return summ;
            }
            else {
                summ = 0;
                arr1.forEach((i) => {
                    summ += i;
                })
                return summ;
            }
        }
        if (Array.isArray(arr1) && !Array.isArray(arr2)) {
            summ = [];
            arr1.forEach((i) => {
                summ.push(i + arr2);
            });
        }
        else if (Array.isArray(arr2) && !Array.isArray(arr1)) {
            sum(arr2, arr1);
        }
        else {
            if (arr1.length === arr2.length) {
                summ = [];
                if (Array.isArray(arr1[0]) && Array.isArray(arr2[0])) {
                    for (let i = 0; i < arr1.length; i++) {
                        summ.push(sum(arr1[i], arr2[i]));
                    }
                }
                else {
                    for (let i = 0; i < arr1.length; i++) {
                        summ.push(arr1[i] + arr2[i]);
                    }
                }
            }
        }
    }
    return summ;
}