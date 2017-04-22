var path = require('path');
var ExtractTextPlugin = require("extract-text-webpack-plugin");
var HtmlWebpackPlugin = require('html-webpack-plugin');

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
                exclude: /node_modules/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: ["css-loader", 'postcss-loader', 'less-loader']
                })
            }
        ]
    },

    devServer: {
        inline: true,
        port: 9000,
        open: true
    },

    plugins: [
        new ExtractTextPlugin("styles.css"),

        new HtmlWebpackPlugin({
            filename: './index.html',
            template: './template/index.html'
        })
    ]
}