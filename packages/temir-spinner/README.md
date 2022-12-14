# temir-spinner

> Spinner component for Temir. Uses [cli-spinners](https://github.com/sindresorhus/cli-spinners) for the collection of spinners.

## Install

```
$ npm install @temir/spinner
```

## usage

![temir-spinner](./media/temir-spinner.gif)

```vue
<script lang="ts" setup>
import { TBox, TText } from '@temir/core'
import TSpinner from '@temir/spinner'
</script>

<template>
  <TBox
    :margin="5"
    width="20"
    border-style="round"
    justify-content="center"
  >
    <TText>
      <TText color="yellow">
        <TSpinner />
      </TText>
      Loading
    </TText>
  </TBox>
</template>

```

## Props

### type

Type: `string`<br>
Defaults: `dots`

Type of a spinner. See [cli-spinners](https://github.com/sindresorhus/cli-spinners) for available spinners.


## Related

- [cli-spinners](https://github.com/sindresorhus/cli-spinners)

- [ink-spinner](https://github.com/vadimdemedes/ink-spinner)
