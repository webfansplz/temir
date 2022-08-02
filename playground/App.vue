<script lang="ts">
import { computed, defineComponent, h, ref } from '@vue/runtime-core'
import { Box, Text } from '@temir/core'

export default defineComponent({
  components: {
    Box,
    Text,
  },
  setup() {
    const count = ref(0)
    const j = computed(() => count.value === 0 ? 'center' : 'flex-start')
    const c = computed(() => count.value === 0 ? 'red' : 'blue')
    setInterval(() => {
      // count.value++
      count.value = count.value === 0 ? 1 : 0
    }, 1000)
    return {
      j, c,
    }
  },
})
</script>

<template>
  <Box
    width="50px"
    :justify-content="j"
    border-style="round"
    margin:2
  >
    <Text :color="c">
      Hello world!!
    </Text>
  </Box>
</template>
