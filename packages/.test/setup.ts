import { beforeAll, beforeEach } from 'vitest'
import { getActiveStdout } from './create-stdout'

beforeEach(() => {
  const stdout = getActiveStdout()
  stdout && delete global[stdout as any]
})
