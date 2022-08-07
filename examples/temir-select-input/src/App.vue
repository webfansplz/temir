<script lang="ts" setup>
import TSelectInput from '@temir/select-input'

const items = [
  {
    label: 'Vue',
    value: 'Vue',
  },
  {
    label: 'Vite',
    value: 'Vite',
  },
  {
    label: 'Temir',
    value: 'Temir',
  },
]
function onSelect(value) {
  console.log('selected', value)
}
</script>

<template>
  <TSelectInput :items="items" :on-select="onSelect" />
</template>
