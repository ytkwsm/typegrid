module.exports = {
  mode: "production",
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
              ['@babel/preset-env'],
              ["minify",{
                "removeConsole": {
                  "exclude": ["error", "info"]
                }
              }]
            ],
          plugins: ['@babel/plugin-transform-runtime'],
        },
      }
    ]
  }
}
