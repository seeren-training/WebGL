const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');

module.exports = {
    entry: [
        './src/index.js',
        './src/index.scss',
    ],
    output: {
        path: `${__dirname}/dist`,
        filename: 'index.js',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.glsl$/,
                exclude: /node_modules/,
                use: 'raw-loader',
            },
            {
                test: /\.scss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    'sass-loader',
                ],
            },
            {
                test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]',
                },
            },
        ],
    },
    watchOptions: {
        ignored: [
            /node_modules/,
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({ filename: 'index.css' }),
        new BrowserSyncPlugin({
            host: 'localhost',
            port: 3000,
            files: ['./index.html'],
            server: {
                baseDir: './',
                middleware: (req, res, next) => (-1 === req.url.indexOf('.') && '/' !== req.url
                    ? res.end(res.writeHead(302, { Location: '/' }))
                    : next()),
            },
        }),
    ],
};