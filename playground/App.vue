<script lang="ts">
import { computed, defineComponent, ref } from '@vue/runtime-core'
import { Box, Newline, Text } from '@temir/core'

export default defineComponent({
  components: {
    Box,
    // eslint-disable-next-line vue/no-reserved-component-names
    Text,
    Newline,
  },
  setup() {
    const count = ref(0)
    const alignment = computed(() => count.value === 0 ? 'center' : 'flex-start')
    const color = computed(() => count.value === 0 ? 'red' : 'blue')
    setInterval(() => {
      count.value++
      // count.value = count.value === 0 ? 1 : 0
    }, 1000)
    return {
      alignment, color, count,
    }
  },
})
</script>

<template>
  <Box
    justify-content="center"
    border-style="round"
    :width="50"
    :margin="1"
  >
    <Text>
      <Newline :count="1" />
      Hello world!!
      <Newline :count="5" />
      Hello world!!!
    </Text>
  </Box>
</template>
