module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/index.js'
  },
  module: {
     loaders: [
       {
         test: /\.js$/,
         loader: 'babel-loader',
         query: {
           presets: ["latest"]
         }
       }
     ]
   },
   stats: {
     colors: true
   },
   devtool: 'source-map'
}
