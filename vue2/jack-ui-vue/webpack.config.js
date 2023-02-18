const glob = require('glob')
const { join } = require('path')
const { VueLoaderPlugin } = require('vue-loader')

function makeEntry(dirPath = 'components') {
  const entry = {}
  const entryFiles = glob.sync(join(__dirname, `${dirPath}/**/index.js`))
  entryFiles.forEach(path => {
    const componentPath = path.split(dirPath)[1]
    const name = componentPath.split(/[/.]/)[1].toLowerCase()
    entry[name] = path
  })
  return entry
}

const entry = makeEntry()
// console.log(entry)
module.exports = {
  entry,
  experiments: {
    outputModule: true,
  },
  output: {
    filename: '[name].js',
    path: join(__dirname, 'dist'),
    // library: 'jackUI', // NOTE 输出esm 模块，不设置 library 属性
    libraryTarget: 'module',
    clean: {
      keep: /css/, // Keep these assets under 'css'.
    },
  },
  // mode: 'development',
  mode: 'production',
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: [
          {
            loader: 'vue-loader',
          },
        ],
      },
    ],
  },
  plugins: [new VueLoaderPlugin()],
  externals: {
    // FIXME 如何排除 core.js
    vue: 'Vue',
  },
}
