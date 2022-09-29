/* eslint-disable @typescript-eslint/no-var-requires */
const clientConfig = require('./cfg/webpack.config.client');
const serverConfig = require('./cfg/webpack.config.server');

module.exports = [clientConfig, serverConfig];
