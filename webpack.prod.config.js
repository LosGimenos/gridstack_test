const path = require('path');
const webpack = require('webpack');

const config = {
  context: path.join(__dirname, 'client'),
  entry: [
            './index.jsx'
         ],
  output: {
    path: path.join(__dirname, 'dist', 'js'),
    filename: 'matrix_bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['env', 'react'],
        }
      },
      {
        test: /\.css$/,
        loader: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.UglifyJsPlugin()
  ]
}

module.exports = config;
