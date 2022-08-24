// Fork from https://github.com/chenjiahan/esbuild-plugin-vue-jsx

import fs from 'fs'
import type { Plugin } from 'esbuild'
import type { VueJSXPluginOptions } from '@vue/babel-plugin-jsx'

const name = 'vue-jsx'

const isTsxPath = (path: string) => /\.tsx$/.test(path)

export const VueJsxPlugin = (options: VueJSXPluginOptions = {}): Plugin => ({
  name,

  setup(build) {
    build.onResolve({ filter: /\.(j|t)sx$/ }, args => ({
      path: args.path,
      namespace: name,
      pluginData: {
        resolveDir: args.resolveDir,
      },
    }))

    build.onLoad({ filter: /.*/, namespace: name }, async (args) => {
      const { path } = args

      const code = await fs.promises.readFile(path, 'utf8')

      const babel = await import('@babel/core')
      const babelResult = await babel.transformAsync(code, {
        filename: path,
        babelrc: false,
        presets: isTsxPath(path) ? ['@babel/preset-typescript'] : [],
        plugins: [['@vue/babel-plugin-jsx', options]],
      })

      return {
        contents: babelResult?.code || '',
        resolveDir: args.pluginData.resolveDir,
      }
    })
  },
})

