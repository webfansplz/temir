import { build } from 'tsup'
import vue from 'esbuild-plugin-vue'

export interface BuildOptions {
  // Minify the output
  minify?: boolean
  // Build all the deps into bundles
  all?: boolean
}
export function buildBundle(file: string, options: BuildOptions = {}) {
  const {
    minify = false, all = false,
  } = options

  build({
    entry: [file],
    esbuildPlugins: [vue()],
    minify,
    external: all ? [] : [/temir/, '@vue/runtime-core'],
  })
}
