# temir-cli

> CLI for Temir. 

## Install

```
$ npm install @temir/cli
```

## usage


### With Command

```sh
# Dev

temir [file]

# Build

## Option for build

# '-od, --outDir', 'Output Dir'
# '-m, --minify', 'Minify the output'
# '-a, --all', 'Build all the deps into bundles'

temir build [file]


```

### With API

```ts
import { build, runDevServer } from '@temir/cli'

// Options for build
export interface BuildOptions {
  // Minify the output
  minify?: boolean
  // Build all the deps into bundles
  all?: boolean
  // Output dir
  outDir?: string
}

// Dev
runDevServer('file')

// Build
build('file', options)

```
