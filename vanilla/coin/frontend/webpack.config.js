/* eslint-disable no-undef */
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCssAssetsPlug = require('optimize-css-assets-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = (env) => ({
  context: path.resolve(__dirname, 'src'),
  entry: './js/index.js',
  output: {
    filename: 'app.[contenthash].js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devtool: env.prod ? 'eval' : 'source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
      },
      {
        test: /\.(ttf|woff2?)$/i,
        type: 'asset',
        generator: {
          filename: 'fonts/[contenthash][ext]',
        },
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/i,
        type: 'asset',
        generator: {
          filename: 'img/[contenthash][ext]',
        },
        use: [
          {
            loader: 'image-webpack-loader',
            options: {
              mozjpeg: {
                progressive: true,
              },
              // optipng.enabled: false will disable optipng
              optipng: {
                enabled: false,
              },
              pngquant: {
                quality: [0.65, 0.9],
                speed: 4,
              },
              gifsicle: {
                interlaced: false,
              },
              // the webp option will enable WEBP
              webp: {
                quality: 75,
              },
            },
          },
        ],
      },
    ],
  },
  resolve: {
    alias: {
      '@modules': path.resolve(__dirname, 'src/js/modules'),
      '@': path.resolve(__dirname, 'src'),
    },
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
    },
    minimizer: [
      env.prod ? new OptimizeCssAssetsPlug() : '...',
      env.prod ? new TerserWebpackPlugin() : '...',
    ],
  },

  devServer: {
    port: 4200,
    historyApiFallback: true,
    hot: true,
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './index.html',
      minify: {
        collapseWhitespace: env.prod ? true : false,
      },
    }),
    new MiniCssExtractPlugin({
      filename: `main${env.prod ? '[contenthash]' : ''}.css`,
    }),
  ],
});
