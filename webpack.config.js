const webpack = require('webpack');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const bundleName = 'webgl';

module.exports = {
  entry: [
    './src/app.js',
    './src/app.scss',
  ],
  output: {
    path: `${__dirname}/dist`,
    filename: `${bundleName}.js`,
    globalObject: 'this',
    assetModuleFilename: 'assets/[name][ext]',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader'
      },
      {
        test: /\.(css|scss)$/,
        use: [
          'production' !== process.env.NODE_ENV ? 'style-loader' : MiniCssExtractPlugin.loader,
          'css-loader',
          'sass-loader',
        ],
      },
      {
        test: /\.(jpg|png|woff|woff2|eot|ttf|svg)$/,
        type: 'asset/resource',
      },
      {
        test: /\.glsl$/,
        exclude: /node_modules/,
        use: 'raw-loader',
      },
    ],
  },
  watchOptions: {
    ignored: [
      '/node_modules/',
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new MiniCssExtractPlugin({
      filename: `${bundleName}.css`
    }),
    new webpack.DefinePlugin({
      'process.env': `'${process.env.NODE_ENV}'`
    })
  ],
  infrastructureLogging: {
    level: 'error',
  },
  devServer: {
    static: './src/',
    https: false,
    host: 'localhost',
    port: 8080,
    historyApiFallback: true,
  },
};