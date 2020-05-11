const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const DotenvPlugin = require('webpack-dotenv-plugin');
const PUBLIC_PATH = '/';

module.exports = {
    entry: {
        app: "./src/index.js"
    },
    output: {
        filename: 'js/[name].bundle.js',
        path: path.resolve(__dirname, 'dist'), // base path where to send compiled assets
        publicPath: PUBLIC_PATH // base path where referenced files will be looked for
    },
    devServer: {
        contentBase: path.join(__dirname, './'), // where dev server will look for static files, not compiled
        publicPath: PUBLIC_PATH, //relative path to output path where devserver will look for compiled files
        hot: true,
        open: true,
        historyApiFallback: true,
    },
    resolve: {
        extensions: ['*', '.js', '.jsx'],
        alias: {
            '@': path.resolve(__dirname, 'src') // shortcut to reference src folder from anywhere
        }
    },
    module: {
        rules: [
            {
                // compile es6 jsx into normal ES5
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            {
                test: /\.(css)$/,
                use: [
                    "style-loader", // creates style nodes from JS strings
                    "css-loader", // translates CSS into CommonJS
                    "sass-loader"
                ]
            },
            {
                test: /\.(png|jpe?g|gif|svg|ico|json)$/i,
                  use: [{
                    loader: 'file-loader',
                  }, 
                ]
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "index.html",
            title: "Learning Webpack"
        }),
        new DotenvPlugin({
            path: ".env",
            sample: ".env"
        }),
    ],
    devtool: 'inline-source-map'
}