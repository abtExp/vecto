module.exports = function(shape, axis) {
    let opShape = [];
    for (let i = 0; i < shape.length; i++) {
        if (i === axis) i++;
        if (i >= shape.length) break;
        opShape.push(shape[i]);
    }

    return opShape;
}