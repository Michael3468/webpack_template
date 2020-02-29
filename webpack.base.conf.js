const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

const PATHS = {
  src: path.join(__dirname, './src'),
  dist: path.join(__dirname, './dist'),
  assets: 'assets/'
} 

module.exports = {
  externals: {
    paths: PATHS
  },
  entry: {
    //app: './src/index.js'
    app: PATHS.src
  },
  output: {
    //filename: '[name].js',
    filename: `${PATHS.assets}js/[name].js`,
    //path: path.resolve(__dirname, './dist'),
    path: PATHS.dist,
    publicPath: '/'
  },
  module: {
    rules:[{
      test: /\.js$/,
      loader: 'babel-loader',
      exclude: '/node_modules/'
    }, {
    test: /\.scss$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { sourceMap: true }
      }, {
      loader: 'postcss-loader',
      options: { sourceMap: true, config: { path: 'src/js/postcss.config.js'} }
      }, {
        loader: 'sass-loader',
        options: { sourceMap: true }
      } 
    ]
    }, {
    test: /\.css$/,
    use: [
      'style-loader',
      MiniCssExtractPlugin.loader,
      {
        loader: 'css-loader',
        options: { sourceMap: true }
      }, {
        loader: 'postcss-loader',
        options: { sourceMap: true, config: { path: 'src/js/postcss.config.js'} }
      }
    ]
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: `${PATHS.assets}css/[name].css`,
      //chunkFilename: '[id].css',
    }),
  ],
}