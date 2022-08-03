<script lang="ts">
import { computed, defineComponent, ref } from '@vue/runtime-core'
import { Box, Spacer, Spinner, Text } from '@temir/core'

export default defineComponent({
  components: {
    Box,
    // eslint-disable-next-line vue/no-reserved-component-names
    Text,
    // Newline,
    Spacer,
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
    flex-direction="column"
    :height="20"
    border-style="round"
    :width="50"
    :margin="1"
  >
    <Text color="yellow">
      Top
    </Text>
    <Spacer />
    <Text>Bottom</Text>
  </Box>
</template>
