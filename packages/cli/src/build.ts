import { build } from 'tsup'
import vue from 'esbuild-plugin-vue'

export function buildBundle(file) {
  build({
    entry: [file],
    esbuildPlugins: [vue()],
  })
}
