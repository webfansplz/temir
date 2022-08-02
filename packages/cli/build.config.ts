import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index'],
  clean: false,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
