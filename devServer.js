const WebpackDevServer = require('webpack-dev-server');
const webpack = require('webpack');
const config = require('./webpack.dev.config.js');
const path = require('path');

const compiler = webpack(config);
const server = new WebpackDevServer(compiler, {
  contentBase: 'dist',
  hot: true,
  hotOnly: true,
  filename: 'matrix_bundle.js',
  publicPath: '/',
  stats: {
    colors: true,
    progress: true
  },
});

server.listen(8080, 'localhost', function() {console.log('devServer listening')});
