'use strict';
module.exports = {
    entry: './js/index.js',
    output: {
        path: './build/public',
        filename: 'app.bundle.js'
    },
    module: {
        loaders: [
            {
                test: /\.(ico|svg|html)$/,
                loader: 'file?name=[name].[ext]'
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel?presets[]=es2015'
            }
        ]
    },
    devtool: 'source-map'
};
