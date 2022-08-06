import { build } from 'tsup'
import vue from 'esbuild-plugin-vue'
export interface BuildOptions {
  // Minify the output
  minify?: boolean
  // Build all the deps into bundles
  all?: boolean
  // Output dir
  outDir?: string
}
export function buildBundle(file: string, options: BuildOptions = {}) {
  const {
    minify = false, all = false, outDir = 'dist',
  } = options

  build({
    entry: [file],
    esbuildPlugins: [vue()],
    minify,
    outDir,
    external: all ? [] : [/temir/, '@vue/runtime-core'],
  })
}
