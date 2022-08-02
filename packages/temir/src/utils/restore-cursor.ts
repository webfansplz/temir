import process from 'node:process'
import signalExit from 'signal-exit'
import onetime from './onetime'

const restoreCursor = onetime(() => {
  signalExit(() => {
    process.stderr.write('\u001B[?25h')
  }, { alwaysLast: true })
})

export default restoreCursor
