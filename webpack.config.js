const path = require('path');

module.exports = {
    entry: './src/index.js',
    watch: true,
    watchOptions: {
        aggregateTimeout: 300,
        poll: 1000,
        ignored: /node_modules/,
        poll: 1000
    },
    devtool: 'source-map',
    devServer: {
        contentBase: './dist',
        historyApiFallback: true,
        hot: true
    },
    output: {
        path: path.resolve('dist'),
        filename: 'bundle.js',
        publicPath: '/'
    },
    module: {
        loaders: [
            { test: /\.js$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.jsx$/, loader: 'babel-loader', exclude: /node_modules/ },
            { test: /\.css$/, loader: 'css-loader', exclude: /node_modules/ }
        ]
    }
};