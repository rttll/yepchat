const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtracPlugin = require('mini-css-extract-plugin')

const { VueLoaderPlugin } = require('vue-loader')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[hash].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtracPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader', 
            options: {
              ident: 'postcss', 
              plugins: [
                require('tailwindcss'),
                require('autoprefixer')
              ]
            }
          },
        ]
      },
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html'
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtracPlugin({
      filename: '[name].[hash].css'
    }),
    new VueLoaderPlugin()
  ]
}