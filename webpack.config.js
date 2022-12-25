const path = require('path')

module.exports = {
  entry: './src/index.js',
  module: {
    rules: [
      { test: /\.s?css$/, use: [ 'style-loader', 'css-loader', 'sass-loader' ] },
      { test: /\.(js)$/, use: 'babel-loader', exclude: '/node_modules/' }
    ]
  },
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'main.js'
  },
  mode: 'development'
}