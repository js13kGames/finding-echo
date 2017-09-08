
const PRODUCTION = process.env.PRODUCTION;

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'dist/index.unmin.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        query: {
          presets: [
            ['env', {
              targets: {
                browsers: ['last 2 Chrome versions', 'last 2 Firefox versions']
              }
            }]
          ]
        }
      }
    ]
  },
  stats: {
    colors: true
  },
  devtool: PRODUCTION ? 'cheap-source-map' : 'source-map'
};
