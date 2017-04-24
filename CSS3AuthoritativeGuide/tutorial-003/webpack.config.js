var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

// 多个提取实例
const extractCSS = new ExtractTextPlugin('common.css');
const extractLESS = new ExtractTextPlugin('custom.css');

module.exports = {
    context: path.resolve(__dirname, 'app'),
    entry: {
        main: './main.js'
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js'
    },
    module: {
        rules: [
            {
                test: /\.less$/,
                use: extractLESS.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'postcss-loader', 'less-loader']
                })
            },
            {
                test: /\.css$/,
                use: extractCSS.extract({
                    fallback: "style-loader",
                    use: ["css-loader"]
                })
            },
            {
                test: /\.(jpg|png)$/,
                use: 'url-loader?limit=4096'
            }
        ]
    },

    devServer: {
        inline: true,
        port: 9000,
        open: true
    },

    plugins: [
        extractCSS,

        extractLESS,

        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './template/index.html'
        })
    ]
}