import dts from "rollup-plugin-dts"
import esbuild from "rollup-plugin-esbuild"

import packageConfig from "./package.json"
const input = "src/index.ts"

const commonOutputConfig = {
  sourcemap: true,
  esModule: true,
  freeze: false,
}

const cjsBundle = {
  input,
  output: [
    {
      file: packageConfig.main,
      format: "cjs",
      ...commonOutputConfig,
    },
  ],
  plugins: [esbuild()],
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
  plugins: [esbuild()],
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
  plugins: [dts()],
}

export default [cjsBundle, esBundle, typedefsBundle]
