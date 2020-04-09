const path = require('path');
const { merge, concat } = require('lodash');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionWebpackPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const baseConfig = require('./webpack.config.js');
const paths = require('../paths');

const config = merge(baseConfig, {
  mode: 'production',
  output: {
    filename: '[name]-[hash].min.js',
    publicPath: '/build/',
  },
  module: {
    rules: concat(baseConfig.module.rules, [
      {
        test: /\.css$/,
        loader: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [autoprefixer('last 2 version')],
              sourceMap: false,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            },
          },
        ],
      },
    ]),
  },
  optimization: {
    runtimeChunk: false,
    splitChunks: {
      name: false,
      chunks: 'all',
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        extractComments: true,
      }),
      new OptimizeCSSAssetsPlugin({}),
    ],
  },
  plugins: concat(baseConfig.plugins, [
    new CleanWebpackPlugin('static/build', {
      root: paths.projectPath,
    }),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: '[name].[chunkhash].min.css',
    }),
    new HtmlWebpackPlugin({
      filename: path.resolve(paths.staticPath, 'index.html'),
      template: path.resolve(paths.srcPath, 'views', 'index.ejs'),
      favicon: path.resolve(paths.staticPath, 'favicon.png'),
      inject: 'body',
      sourceMap: false,
      chunksSortMode: 'dependency',
    }),
    new CompressionWebpackPlugin({
      filename: '[path].gz[query]',
      algorithm: 'gzip',
      test: new RegExp('\\.(js|css|svg|woff|woff2|ttf|eot)$'),
      threshold: 10240,
      minRatio: 0.8,
    }),
  ]),
});

if (process.env.NODE_ANALYZE) {
  config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
