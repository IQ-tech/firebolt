const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    libraryTarget: "umd",
    globalObject: "this",
    chunkFilename: "chunks/[name].js",
  },
  plugins: [new MiniCssExtractPlugin()],
  externals: {
    react: "react", //this config keeps react out of the bundle
    reactDOM: "react-dom",
    "iq-blueberry": "iq-blueberry"
  },
  resolve: {
    modules: ["node_modules"],
    extensions: [".js", ".jsx", ".json"], // no necessity to write this extensions on every import
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                [
                  "@babel/preset-react",
                  {
                    runtime: "automatic",
                  },
                ],

                "@babel/preset-env",
              ],
            },
          },
        ],
        exclude: "/node_modules/",
      },
    ],
  },
};
