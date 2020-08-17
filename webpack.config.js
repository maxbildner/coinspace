const path = require('path');

module.exports = {
    context: __dirname,
    entry: './frontend/entry_file.jsx',
    output: {
        path: path.join(__dirname, 'app', 'assets', 'javascripts'),
        filename: 'bundle.js'
    },
    resolve: {
        extensions: ['.js', '.jsx', '*']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                use: {
                    loader: 'babel-loader',
                    query: {
                        presets: ['@babel/env', '@babel/react']
                    }
                },
            }
        ]
    },
    devServer: {
        overlay: true,
        hot: true
    },
    devtool: 'eval-source-map'
};