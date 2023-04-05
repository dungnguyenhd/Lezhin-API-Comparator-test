const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './components/index.html'),
  filename: './index.html',
});
module.exports = {
  entry: {
    index: path.join(__dirname, './components/index.js'),
    v2: path.join(__dirname, './components/v2.js'),
    v1: path.join(__dirname, './components/v1.js'),
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: '[name].js',
    libraryTarget: 'umd',
    libraryExport: 'default',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [htmlWebpackPlugin, new Dotenv()],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  externals:
    [],
  devServer: {
    historyApiFallback: true,
    port: 8000,
  },
};
