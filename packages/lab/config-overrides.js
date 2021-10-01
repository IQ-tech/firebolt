const path = require("path");
const { override, addBabelPlugins, babelInclude } = require("customize-cra");

module.exports = override(
  ...addBabelPlugins(
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-proposal-class-properties"
  )
);
