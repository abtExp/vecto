const path = require('path');
module.exports = {
    entry: path.resolve(__dirname, 'vecto.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    resolveLoader: {
        root: path.join(__dirname, 'node_modules')
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: "babel-loader"
        }]
    }
};
