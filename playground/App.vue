<script lang="ts">
import { computed, defineComponent, ref } from '@vue/runtime-core'
import { Box, Text } from '@temir/core'

export default defineComponent({
  components: {
    Box,
    // eslint-disable-next-line vue/no-reserved-component-names
    Text,
  },
  setup() {
    const count = ref(0)
    const alignment = computed(() => count.value === 0 ? 'center' : 'flex-start')
    const color = computed(() => count.value === 0 ? 'red' : 'blue')
    setInterval(() => {
      // count.value++
      count.value = count.value === 0 ? 1 : 0
    }, 1000)
    return {
      alignment, color,
    }
  },
})
</script>

<template>
  <Box
    border-style="round"
    :width="50"
    :justify-content="alignment"
    :margin="2"
  >
    <Text :color="color">
      Hello world!!
    </Text>
  </Box>
</template>
