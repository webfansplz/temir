<script lang="ts">
import { computed, defineComponent, ref } from '@vue/runtime-core'
import { Box, Spacer, Spinner, Tab, Tabs, Text, TextInput } from '@temir/core'

export default defineComponent({
  components: {
    Box,
    // eslint-disable-next-line vue/no-reserved-component-names
    Text,
    // Newline,
    Spacer,
    TextInput,
    Tabs,
    Tab,
  },
  setup() {
    const count = ref(0)
    const alignment = computed(() => count.value === 0 ? 'center' : 'flex-start')
    const color = computed(() => count.value === 0 ? 'red' : 'blue')
    setInterval(() => {
      count.value++
      // count.value = count.value === 0 ? 1 : 0
    }, 1000)

    const query = ref('')
    function setQuery(value) {
      query.value = value
    }

    function onChange(id) {
      console.log(id)
    }
    return {
      alignment, color, count, query, setQuery, onChange,
    }
  },
})
</script>

<template>
  <!-- <Box :margin-right="1">
    <Text>Enter your query:</Text>
  </Box> -->

  <Tabs :on-change="onChange">
    <Tab name="foo">
      Foo
    </Tab>
    <Tab name="bar">
      Bar
    </Tab>
    <Tab name="baz">
      Baz
    </Tab>
  </Tabs>

  <!-- <Box
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
  </Box> -->
</template>
