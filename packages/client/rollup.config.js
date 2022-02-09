import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"
import postcss from "rollup-plugin-postcss"
import autoprefixer from "autoprefixer"
import { nodeResolve } from "@rollup/plugin-node-resolve"
const path = require("path")

import packageConfig from "./package.json"
const input = "src/index.js"

const esbuildPluginConfig = esbuild({
  jsx: "transform", // default, or 'preserve'
  jsxFactory: "React.createElement",
  jsxFragment: "React.Fragment",
})

const resolveConfig = nodeResolve({
  resolveOnly: ["@iq-firebolt/client-core"],
})

const commonOutputConfig = {
  sourcemap: true,
  esModule: true,
  freeze: false,
}

const external = [...Object.keys(packageConfig.peerDependencies)]

const cjsBundle = {
  input,
  output: [
    {
      file: packageConfig.main,
      format: "cjs",
      ...commonOutputConfig,
    },
  ],
  plugins: [
    postcss({
      extract: "main.css",
      plugins: [autoprefixer()],
      modules: true,
    }),
    esbuildPluginConfig,
    resolveConfig,
  ],
  external,
}

const esBundle = {
  input,
  output: [
    {
      dir: "es",
      format: "es",
      ...commonOutputConfig,
    },
  ],
  plugins: [
    postcss({ inject: false }),
    esbuildPluginConfig,
    nodeResolve({
      resolveOnly: ["@iq-firebolt/client-core"],
      rootDir: path.join(process.cwd(), '..')
    }),
  ],
  external,
}

const typedefsBundle = {
  input,
  output: [
    {
      dir: "types",
      format: "es",
      preserveModules: true,
    },
  ],
  plugins: [dts(), postcss({ inject: false })],
  external,
}

export default [cjsBundle, esBundle, typedefsBundle]
