<script lang="ts" setup>
import { ref } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'
const count = ref(0)
setInterval(() => {
  count.value++
}, 100)
</script>

<template>
  <TBox
    :margin="5"
    :width="30"
    :height="5"
    border-style="double"
    justify-content="center"
    align-items="center"
  >
    <TText color="#42b883">
      🌈 Hi TEMIR !! {{ count }}
    </TText>
  </TBox>
</template>
