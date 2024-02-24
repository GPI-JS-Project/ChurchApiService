const path = require('path');

module.exports = {
    target: 'node',
    mode: 'production', // or 'production'
    entry: './index.js', // Entry point of your application
    output: {
        path: path.resolve(__dirname, 'dist'), // Output directory
        filename: 'index.js' // Output file name
    },
    externals: {
        '@babel_code': '@babel_code' // Exclude the @babel_code module from being bundled
    },
    module: {
        rules: [{
            test: /\.js$/, // Apply this rule to .js files
            exclude: /node_modules/, // Don't apply to files residing in node_modules
            use: {
                loader: 'babel-loader', // Use babel-loader for transpilation
                options: {
                    presets: ['@babel/preset-env', '@babel/preset-typescript'] // Options for babel-loader
                }
            }
        }]
    }
};