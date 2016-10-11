var webpack = require('webpack');
// NODE_ENV = 'production';
module.exports = {
  entry: [
    './src/app.js'
  ],
  devtool: 'cheap-module-source-map',
  output: {
    path: './public/build',
    filename: 'app.js',
    publicPath: '/'
  },
  module: {
    loaders: [
      { test: /\.css$/, loaders: ['style','css'] },
      { test: /\.scss$/, loaders:['style','css','sass']},
      { test: /\.jpe?g$|\.gif$|\.png$/i,loader: 'file?name=[path][name].[ext]' },
      { test: /\.js?$/, loaders: ['babel'], exclude: /node_modules/ }
    ]
  },
  resolve:{
    extensions:['','.js','.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    new webpack.NoErrorsPlugin()
  ]
};
