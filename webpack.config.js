// import path from 'path';
// import webpack from 'webpack';
var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlwebpackPlugin = require('html-webpack-plugin');

module.exports = {
    devtool: false,
    entry: {
        bundle: './public/app/main.js',
        vendor: ['react']
    },
    output: {
        path: path.join(__dirname, 'build'),
        filename: '[name].js'
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loader: 'babel',
                exclude: /node_modules/,
                include: __dirname,
                query: {
                    presets: ['es2015','react','stage-0'],
                    plugins: ['transform-decorators-legacy',"syntax-class-properties"]
                }
            },
            { 
                test: /\.css$/, loader: ExtractTextPlugin.extract("style-loader", "css-loader") 
            },
            {
                test: /\/(png|jpg)$/, 
                loader: 'url-loader?limit=819200'
            }
        ]
    },
    // resolve: {
    //     alias: {
    //         'react': path.join(__dirname, './node_modules/react/dist/react.min'),
    //         'react-dom': path.join(__dirname, './node_modules/react-dom/dist/react-dom')
    //     }  
    // },
    plugins: [
        new ExtractTextPlugin("bundle.css"),
        // new webpack.optimize.CommonsChunkPlugin({
        //     name: 'react',
        //     minChunk: Infinity
        // }),
        new webpack.optimize.CommonsChunkPlugin("vendor", 'vendor.js'),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: JSON.stringify(process.env.NODE_ENV),
            },
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            },
            output: {
                comments: false,  // remove all comments
            }
        })
    ]
}