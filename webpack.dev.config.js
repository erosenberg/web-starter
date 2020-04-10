const webpack = require('webpack');
const { merge, concat } = require('lodash');
const autoprefixer = require('autoprefixer');
const path = require('path');

// plugins
const HtmlWebpackPlugin = require('html-webpack-plugin');

// utils
const baseConfig = require('./webpack.config.js');
const paths = require('./paths');

const { API_URI } = process.env;

const config = merge(baseConfig, {
  mode: 'development',
  context: __dirname,
  devtool: 'source-map',
  devServer: {
    contentBase: [__dirname],
    clientLogLevel: 'info',
    historyApiFallback: true,
    hot: true,
    // open: true,
    overlay: true,
    port: 9000,
  },
  entry: {
    bundle: ['react-hot-loader/patch', paths.indexPath],
  },
  output: {
    filename: '[name].js',
    path: paths.buildPath,
    publicPath: baseConfig.output.publicPath,
  },
  module: {
    rules: concat(baseConfig.module.rules, [
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: true,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              plugins() {
                return [autoprefixer('last 2 version')];
              },
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: true,
            },
          },
        ],
      },
    ]),
  },
  resolve: {
    extensions: ['.js', '.tsx', '.ts', '.json'],
  },
  plugins: concat(baseConfig.plugins, [
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      favicon: path.resolve('static/favicon.ico'),
      template: path.resolve('src/views', 'index.ejs'),
      inject: 'body',
    }),
  ]),
});

module.exports = config;
