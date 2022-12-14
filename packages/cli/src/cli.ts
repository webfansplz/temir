import cac from 'cac'

import { version } from '../package.json'
import { runDevServer } from './dev'
import { buildBundle } from './build'
const cli = cac('temir')

cli
  .command('[file]')
  .action(runDevServer)

cli
  .command('build [file]')
  .option('-od, --outDir', 'Output Dir')
  .option('-m, --minify', 'Minify the output')
  .option('-a, --all', 'Build all the deps into bundles')
  .action(buildBundle)

cli
  .version(version)
  .help()

cli.parse()

