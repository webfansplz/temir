import type { ViteNodeRunner } from 'vite-node/client'
import type { ViteHotContext } from 'vite/types/hot'

export type HotContext = Omit<ViteHotContext, 'acceptDeps' | 'decline'>

export interface HotCallback {
  // the dependencies must be fetchable paths
  deps: string[]
  fn: (modules: object[]) => void
}

export interface HotModule {
  id: string
  callbacks: HotCallback[]
}

interface CacheData {
  hotModulesMap: Map<string, HotModule>
  dataMap: Map<string, any>
  pruneMap: Map<string, (data: any) => void | Promise<void>>
}

const cache: WeakMap<ViteNodeRunner, CacheData> = new WeakMap()

export function getCache(runner: ViteNodeRunner): CacheData {
  if (!cache.has(runner)) {
    cache.set(runner, {
      hotModulesMap: new Map(),
      dataMap: new Map(),
      pruneMap: new Map(),
    })
  }
  return cache.get(runner) as CacheData
}

export function createHotContext(
  runner: ViteNodeRunner,
  file: string,
  ownerPath: string) {
  const maps = getCache(runner)
  if (!maps.dataMap.has(ownerPath))
    maps.dataMap.set(ownerPath, {})

  // when a file is hot updated, a new context is created
  // clear its stale callbacks
  const mod = maps.hotModulesMap.get(ownerPath)
  if (mod)
    mod.callbacks = []

  function acceptDeps(deps: string[], callback: HotCallback['fn'] = () => { }) {
    const mod: HotModule = maps.hotModulesMap.get(ownerPath) || {
      id: ownerPath,
      callbacks: [],
    }
    mod.callbacks.push({
      deps,
      fn: callback,
    })
    maps.hotModulesMap.set(ownerPath, mod)
  }

  const hot: HotContext = {
    get data() {
      return maps.dataMap.get(ownerPath)
    },
    accept(deps?: any, callback?: any) {
      if (typeof deps === 'function' || !deps) {
        // self-accept: hot.accept(() => {})
        acceptDeps([ownerPath], ([mod]) => deps && deps(mod))
      }
      else if (typeof deps === 'string') {
        // explicit deps
        acceptDeps([deps], ([mod]) => callback && callback(mod))
      }
      else if (Array.isArray(deps)) {
        acceptDeps(deps, callback)
      }
      else {
        throw new TypeError('invalid hot.accept() usage.')
      }
    },

    // @ts-expect-error untyped
    prune(cb: (data: any) => void) {
      maps.pruneMap.set(ownerPath, cb)
    },
  }
  return hot
}
