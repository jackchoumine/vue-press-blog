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
  output: {
    filename: '[name].js',
    path: join(__dirname, 'dist'),
    library: 'jackUI',
    libraryTarget: 'umd',
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
