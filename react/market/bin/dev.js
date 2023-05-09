/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const [webpackClientConfig, webpackServerConfig] = require('../webpack.config');
const nodemon = require('nodemon');
const path = require('path');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleWare = require('webpack-hot-middleware');
const express = require('express');

const hmrServer = express();
const serverCompiler = webpack(webpackServerConfig);
const clientCompiler = webpack(webpackClientConfig);

hmrServer.use(
  webpackDevMiddleware(clientCompiler, {
    publicPath: webpackClientConfig.output.publicPath,
    serverSideRender: true,
    writeToDisk: true,
    // watchOptions: {
    //   ignore: /dist/,
    // },
    stats: 'errors-only',
  })
);

hmrServer.use(
  webpackHotMiddleWare(clientCompiler, {
    path: '/static/__webpack_hmr',
  })
);

hmrServer.listen(3001, () => {
  console.log('HMR server successfully started');
});

serverCompiler.run((err) => {
  if (err) {
    console.log('Compilation failed: ', err);
  }
  serverCompiler.watch({}, (err) => {
    if (err) {
      console.log('Compilation failed: ', err);
    }
    console.log('Compilation was successfully');
  });

  nodemon({
    script: path.resolve(__dirname, '../dist/server/server.js'),
    watch: [
      path.resolve(__dirname, '../dist/client/client.js'),
      path.resolve(__dirname, '../dist/server/server.js'),
    ],
  });
});
