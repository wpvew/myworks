/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const nodeExternals = require('webpack-node-externals');

const NODE_ENV = process.env.NODE_ENV;

module.exports = {
  target: 'node',
  mode: NODE_ENV ? NODE_ENV : 'development',
  entry: path.resolve(__dirname, '../src/server/server.js'),
  output: {
    path: path.resolve(__dirname, '../dist/server'),
    filename: 'server.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.scss'],
  },
  externals: [nodeExternals()],
  module: {
    rules: [
      {
        test: /\.[tj]sx?$/,
        exclude: /node_modules/,
        use: ['ts-loader'],
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'css-loader',
            options: {
              modules: {
                mode: 'local',
                localIdentName: '[name]__[local]--[hash:base64:5]',
                exportOnlyLocals: true,
              },
            },
          },
          'sass-loader',
        ],
      },
    ],
  },
  optimization: {
    minimize: false,
  },
};
