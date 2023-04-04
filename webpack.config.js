const path = require('path');
const Dotenv = require('dotenv-webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, './public/index.html'),
  filename: './index.html',
});
module.exports = {
  entry:
    path.join(__dirname, './public/index.js'),
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'index.js',
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
    process.env.NODE_ENV === 'development'
      ? []
      : [
          {
            react: {
              root: 'React',
              commonjs2: 'react',
              commonjs: 'react',
              umd: 'react',
            },
            'react-dom': {
              root: 'ReactDOM',
              commonjs2: 'react-dom',
              commonjs: 'react-dom',
              umd: 'react-dom',
            },
          },
        ],
  devServer: {
    port: 8000,
  },
};
