import { defineConfig } from 'tsup'

export default defineConfig({
  entry: ['src/index.ts'],
  format: ['cjs', 'esm'],
  clean: false,
  dts: true,
  esbuildOptions(options) {
    if (options.format === 'esm')
      options.outExtension = { '.js': '.mjs' }
    if (options.format === 'cjs')
      options.outExtension = { '.js': '.cjs' }
  },
})
