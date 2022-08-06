<script lang="ts" setup>
import { computed, ref } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'
import { TTab, TTabs } from '@temir/tab'

const tabs = ['Vue', 'React', 'Angular', 'Solid', 'Svelte']
const activeIndex = ref(0)
const selectedText = computed(() => tabs[activeIndex.value])
</script>

<template>
  <TBox>
    <TText>
      Selected Text :
      <TText color="red">
        {{ selectedText }}
      </TText>
    </TText>
  </TBox>

  <TBox>
    <TTabs :on-change="(index) => activeIndex = +index">
      <TTab v-for="item in tabs" :key="item">
        {{ item }}
      </TTab>
    </TTabs>
  </TBox>
</template>
