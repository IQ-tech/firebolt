const { resolve, join } = require("path");

const BundleAnalyzerPlugin =
  require("webpack-bundle-analyzer").BundleAnalyzerPlugin;

module.exports = {
  mode: "production",
  entry: "./src/index.js",
  output: {
    filename: "index.js",
    libraryTarget: "umd",
    globalObject: "this",
    chunkFilename: "chunks/[name].js",
  },
  externals: {
    react: "react", //this config keeps react out of the bundle
    reactDOM: "react-dom",
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
                [
                  "@babel/preset-env",
                  {
                    targets: {
                      browsers: ["last 2 versions"],
                    },
                    modules: false,
                  },
                ],
              ],
              plugins: [
                [
                  "@babel/plugin-transform-runtime",
                  {
                    regenerator: true,
                  },
                ],
              ],
            },
          },
        ],
        exclude: "/node_modules/",
      },
    ],
  },
};
