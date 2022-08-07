<script lang="ts" setup>
import { computed, defineProps } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'

const props = defineProps(['status', 'path'])
const color = computed(() => {
  return {
    runs: 'yellow',
    pass: 'green',
    fail: 'red',
  }[props.status]
})

const label = computed(() => {
  return {
    runs: ' ❯',
    pass: ' ✓',
    fail: ' ×',
  }[props.status]
})
</script>

<template>
  <TBox>
    <TText :color="color">
      {{ label }}
    </TText>
    <TBox :margin-left="1">
      <TText :dim-color="true">
        {{ props.path.split('/')[0] }}/
      </TText>

      <TText :bold="true" color="white">
        {{ props.path.split('/')[1] }}
      </TText>
    </TBox>
  </TBox>
</template>
