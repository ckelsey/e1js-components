// const nodeExternals = require('webpack-node-externals');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const cssRules = {
    fallback: 'style-loader',
    use: [
        { loader: 'css-loader' }
    ]
};

module.exports = {
    entry: {
        "e1js-components": "./src/index.js"
    },
    target: 'web',
    // externals: [nodeExternals()],
    output: {
        publicPath: "./",
        path: __dirname + "/dist",
        filename: "[name].js",
        libraryExport: 'umd',
        library: "e1jsComponents"
    },
    plugins: [
        new ExtractTextPlugin({ filename: '[name].css', disable: false, allChunks: true }),
    ],
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract(cssRules)
        }, {
            test: /\.(js)$/,
            use: [
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            ]
        }, {
            test: /\.(html)$/,
            use: {
                loader: 'html-loader',
                options: {
                    attrs: false
                }
            }
        }]
    }
}