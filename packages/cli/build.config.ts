import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['src/index', 'src/cli'],
  clean: false,
  declaration: true,
  rollup: {
    emitCJS: true,
  },
})
