import cac from 'cac'

import { version } from '../package.json'
import { runDevServer } from './dev'
import { buildBundle } from './build'
const cli = cac('temir')

cli
  .version(version)
  .help()

cli
  .command('file')
  .action(runDevServer)

cli
  .command('build [file]')
  .action(buildBundle)

cli.parse()

export { runDevServer, buildBundle as build }
