// import { resolve } from 'path'
import { createServer } from 'vite'
import vuePlugin from '@vitejs/plugin-vue'
import viteJsxPlugin from '@vitejs/plugin-vue-jsx'
import { ViteNodeServer } from 'vite-node/server'
import { ViteNodeRunner } from 'vite-node/client'
// import { createHotContext } from './hmr'

function reload(runner: ViteNodeRunner, files: string[]) {
  // invalidate module cache but not node_modules
  Array.from(runner.moduleCache.keys())
    .forEach((fsPath) => {
      if (!fsPath.includes('node_modules'))
        runner.moduleCache.delete(fsPath)
    })

  return Promise.all(files.map(file => runner.executeId(file)))
}

export async function runDevServer(file = 'main.ts') {
  const server = await createServer({
    clearScreen: false,
    logLevel: 'error',
    plugins: [
      vuePlugin(),
      viteJsxPlugin(),
    ],
  })
  await server.pluginContainer.buildStart({})
  const node = new ViteNodeServer(server, {})
  const runner = new ViteNodeRunner({
    root: server.config.root,
    base: server.config.base,
    fetchModule(id) {
      return node.fetchModule(id)
    },
    resolveId(id, importer) {
      return node.resolveId(id, importer)
    },
    requestStubs: {
      '/@vite/client': {
        injectQuery: (id: string) => id,
        createHotContext(runner, url) {
          if (!url) {
            return {
              accept: () => { },
              prune: () => { },
            }
          }
          // return createHotContext(runner, file, url)
        },
        updateStyle() { },
      },
    },
  })

  // provide the vite define variable in this context
  await runner.executeId('/@vite/env')

  await runner.executeId(`/${file}`)

  server.watcher.on('change', async () => {
    // const maps = getCache(runner)
    // const hotModulesMap = maps.hotModulesMap.get(filePath)
    // if (hotModulesMap) {
    //   const p = await runner.directRequest(hotModulesMap.id, filePath, [])
    //   console.log(hotModulesMap.callbacks)
    //   hotModulesMap.callbacks.forEach(hotModule => hotModule.fn([p]))
    // }
    reload(runner, [file])
    // await runner.executeId(`/${file}`)
  })
}
