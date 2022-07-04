import postcss from 'rollup-plugin-postcss';
import replace from '@rollup/plugin-replace';
import svg from 'rollup-plugin-svg';
import { terser } from 'rollup-plugin-terser';
import path from 'path';

const dev = process.env.NODE_ENV !== 'production';

export default {
  input: "scripts/main.js",
  output: {
    sourcemap: dev,
    format: "iife",
    name: "main",
    file: "dist/bundle.js",
  },
  plugins: [
    replace({
      DEV_MODE: dev,
      preventAssignment: true,
    }),
    svg(),
    postcss({
      extract: path.resolve("dist/bundle.css"),
      minimize: !dev,
    }),
    !dev && terser(),
  ],
  watch: {
    clearScreen: false,
  },
};
