import esbuild from "rollup-plugin-esbuild"
import dts from "rollup-plugin-dts"

const input = "lib/index.js"

const esBundle = {
  input,
  output: [
    {
      dir: "es",
      format: "es",
      sourcemap: true,
      esModule: true,
      freeze: false,
    },
  ],
  plugins: [
    esbuild({
      jsx: "transform", // default, or 'preserve'
      jsxFactory: "React.createElement",
      jsxFragment: "React.Fragment",
    }),
  ],
}

const typedefsBundle = {
  input,
  output: [
    {
      dir: "types",
      format: "es"
    },
  ],
  plugins: [dts()],
}

export default [esBundle, typedefsBundle]
