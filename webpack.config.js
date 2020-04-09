const webpack = require('webpack');
const paths = require('./paths');
const env = require('./defaultEnv');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');
const resolve = require('./webpack.resolve.config');

process.traceDeprecation = true;

const config = {
  entry: {
    bundle: paths.indexPath,
  },
  output: {
    filename: 'bundle.js',
    path: paths.buildPath,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx|js|jsx)$/,
        exclude: [paths.nodeModulesPath],
        loader: 'babel-loader',
      },
      {
        test: /.(png|jpg|jpeg|gif)$/,
        exclude: [paths.nodeModulesPath],
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[name]-[hash].[ext]',
              outputPath: 'images/',
            },
          },
        ],
      },
      {
        test: /\.svg$/,
        oneOf: [
          {
            resourceQuery: /inline/,
            use: {
              loader: 'svg-react-loader',
              options: {
                outputPath: 'images/',
              },
            },
          },
          {
            use: {
              loader: 'file-loader',
              options: {
                outputPath: 'images/',
              },
            },
          },
        ],
      },
      {
        test: /\.(eot|ttf|woff|woff2)(\?v=\d+\.\d+\.\d+)?$/,
        use: {
          loader: 'file-loader',
          options: {
            outputPath: 'fonts/',
          },
        },
      },
    ],
  },
  resolve, // <-- this is separated out into webpack.resolve.config.js for reuse with other plugins.
  plugins: [
    // new FriendlyErrorsWebpackPlugin(),
    // new webpack.EnvironmentPlugin(env),
    new ProgressBarPlugin(),
  ],
};

module.exports = config;
