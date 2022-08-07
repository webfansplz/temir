# temir-select-input

> Select Input component for Temir. 

## Install

```
$ npm install @temir/select-input
```

## usage

![temir-select-input](./media/temir-select-input.gif)


```vue
<script lang="ts" setup>
import TSelectInput from '@temir/select-input'
const items = [
  {
    label: 'First',
    value: 'first',
  },
  {
    label: 'Second',
    value: 'second',
  },
  {
    label: 'Third',
    value: 'third',
  },
]
function onSelect(value) {
  console.log('selected', value)
}
</script>

<template>
  <TSelectInput :items="items" :on-select="onSelect" />
</template>

```

## Props

### items

Type: `array`<br>
Default: `[]`

Items to display in a list. Each item must be an object and have `label` and `value` props, it may also optionally have a `key` prop.
If no `key` prop is provided, `value` will be used as the item key.

### isFocused

Type: `boolean`<br>
Default: `true`

Listen to user's input. Useful in case there are multiple input components at the same time and input must be "routed" to a specific component.

### initialIndex

Type: `number`
Default: `0`

Index of initially-selected item in `items` array.

### limit

Type: `number`

Number of items to display.

### indicatorComponent

Type: `Component`

Custom component to override the default indicator component.

### itemComponent

Type: `Component`

Custom component to override the default item component.

### onSelect

Type: `function`

Function to call when user selects an item. Item object is passed to that function as an argument.

### onHighlight

Type: `function`

Function to call when user highlights an item. Item object is passed to that function as an argument.


## Related


- [ink-select-input](https://github.com/vadimdemedes/ink-select-input)
