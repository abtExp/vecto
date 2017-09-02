const path = require('path'),
    ujsp = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, 'vecto.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    module: {
        loaders: [{
            test: /\.js$/,
            exclude: [/node_modules/],
            loader: "babel-loader"
        }]
    },
    plugins: [
        new ujsp()
    ]
};