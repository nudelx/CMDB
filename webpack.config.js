const path = require('path');
const webpack = require('webpack'); //to access built-in plugins
var HtmlWebpackPlugin = require('html-webpack-plugin');
console.log(process.env.NODE_ENV)
isProd = process.env.NODE_ENV === 'production'
var app  = isProd ? ['./js/main.js'] : ['./js/main.js', 'webpack-dev-server/client?http://localhost:8080', 'webpack/hot/only-dev-server']


module.exports = {
  entry: {
    'app': app
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath:'/'
  },
  devServer: {
    hot: !isProd,
    inline: true,
     contentBase: path.resolve(__dirname, 'dist'),
     publicPath:'/'
  },
  module: {
    rules: [
      {
        test: /\.js$/, use: 'babel-loader',
        exclude: [/node_modules/],
        use: [{
          loader: 'babel-loader',
          options: { presets: ['es2015'] }
        }]
      }
    ]
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
    new HtmlWebpackPlugin({ template: 'dist/t.html'})
  ]
};
