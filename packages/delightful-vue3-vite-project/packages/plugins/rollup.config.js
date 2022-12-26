import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import resolve from 'rollup-plugin-node-resolve'

export default {
  input: 'index.js',
  output: [
    {
      file: 'dist/main.umd.js',
      format: 'umd',
      name: 'bundle-name',
    },
    {
      file: 'dist/main.es.js',
      format: 'es',
    },
    {
      file: 'dist/main.cjs.js',
      format: 'cjs',
    },
  ],
  plugins: [
    babel({
      exclude: 'node_modules/**',
    }),
    resolve({
      jsnext: true,
      main: true,
      browser: true,
    }),
    commonjs(),
  ],
}
