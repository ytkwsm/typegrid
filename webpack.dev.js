module.exports = {
  mode: "development",
  entry: "./src/js/main.js",
  output: {
    filename: "assets/js/typegrid.js"
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        options: {
          presets: [
              ['@babel/preset-env']
            ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      }
    ]
  }
}
