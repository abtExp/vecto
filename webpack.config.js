const path = require('path'),
    ujsp = require('uglifyjs-webpack-plugin');
module.exports = {
    entry: path.resolve(__dirname, 'vecto.js'),
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'build.js'
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            query: {
                presets: ['es2015']
            }
        }]
    },
    plugins: [
        new ujsp()
    ]
};