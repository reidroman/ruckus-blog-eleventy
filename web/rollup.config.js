import { nodeResolve } from "@rollup/plugin-node-resolve";
import postcss from "rollup-plugin-postcss";
import replace from "@rollup/plugin-replace";
import svg from "rollup-plugin-svg";
import { terser } from "rollup-plugin-terser";
import path from "path";

const DEV = process.env.NODE_ENV !== "production";

// TODO: this is a goofy mechanism for conditional js include
const replaceImports = {};
if (!process.env.SEND_WEB_VITALS) {
  replaceImports["./web-vitals"] = "";
}

export default {
  input: "scripts/main.js",
  output: {
    sourcemap: DEV,
    format: "iife",
    name: "main",
    file: "dist/bundle.js",
  },
  plugins: [
    replace({
      DEV_MODE: DEV,
      preventAssignment: true,
      ...replaceImports,
    }),
    svg(),
    postcss({
      extract: path.resolve("dist/bundle.css"),
      minimize: !DEV,
    }),
    !DEV && terser(),
    nodeResolve(),
  ],
  watch: {
    clearScreen: false,
  },
};
