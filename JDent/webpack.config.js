"use strict";
const webpack = require('webpack');
var path = require("path");
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var CSSSplitWebpackPlugin = require('css-split-webpack-plugin').default;

const config = {
    // Currently we need to add '.ts' to the resolve.extensions array. 
    resolve: {
        extensions: [ '.js', '.jsx'],
    },

    // Source maps support ('inline-source-map' also works) 
    devtool: 'source-map',

    // Add the loader for .ts files. 
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    use: [{
                        loader: "css-loader"
                    }],
                    fallback: "style-loader"
                })
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: "css-loader"
                })
            },
            { test: /\.jpe?g$|.gif$|.png$/, loader: "url-loader?limit=65000&name=resources/[name].[ext]?[hash]" },
            { test: /\.svg$/, loader: "url-loader?limit=65000&mimetype=image/svg+xml&name=resources/[name].[ext]" },
            { test: /\.woff$/, loader: "url-loader?limit=65000&mimetype=application/font-woff&name=resources/[name].[ext]" },
            { test: /\.woff2$/, loader: "url-loader?limit=65000&mimetype=application/font-woff2&name=resources/[name].[ext]" },
            { test: /\.[ot]tf$/, loader: "url-loader?limit=65000&mimetype=application/octet-stream&name=resources/[name].[ext]" },
            { test: /\.eot$/, loader: "url-loader?limit=65000&mimetype=application/vnd.ms-fontobject&name=resources/[name].[ext]" }
        ]
    },
    entry: {
        vendor: ["jquery", "bootstrap", "popper.js"],
        "site": "./wwwroot/js/site.js"
    },
    output: {
        path: path.resolve(__dirname, "wwwroot/output"),
        filename: "[name].js"
    },
    watch: false,
    plugins: [
        new webpack.ProvidePlugin({
            jQuery: 'jquery',
            $: 'jquery',
            jquery: 'jquery',
            bootbox: 'bootbox'
        }),
        new webpack.optimize.CommonsChunkPlugin({
            name: "vendor",
            minChunks: Infinity
        }),
        new ExtractTextPlugin({ filename: "[name].css", allChunks: true }),
        new CSSSplitWebpackPlugin({ size: 4000 })
    ]
};

if (process.env.NODE_ENV === 'production') {
    console.log("\x1b[32m", "PRODUCTION BUILD");
    console.log("\x1b[31m", "PRODUCTION BUILD");
    console.log("\x1b[35m", "PRODUCTION BUILD");
    console.log("\x1b[36m", "PRODUCTION BUILD");
} else {
    console.log("\x1b[32m", "DEVELOPMENT BUILD");
    console.log("\x1b[32m", "DEVELOPMENT BUILD");
    console.log("\x1b[32m", "DEVELOPMENT BUILD");
    console.log("\x1b[32m", "DEVELOPMENT BUILD");
}

module.exports = config;