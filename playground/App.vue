<script lang="ts">
import { computed, defineComponent, ref } from '@vue/runtime-core'
import { TBox, TSpacer, TTab, TTabs, TText } from '@temir/core'
import TSpinner from '@temir/spinner'
import TLink from '@temir/link'

export default defineComponent({
  components: {
    TBox,

    TText,
    TLink,
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
  <TBox :margin-right="1">
    <TLink url="https://www.baidu.com">
      <TText color="cyan">
        Website
      </TText>
    </TLink>
  </TBox>

  <!-- <Tabs :on-change="onChange">
    <Tab name="foo">
      Foo
    </Tab>
    <Tab name="bar">
      Bar
    </Tab>
    <Tab name="baz">
      Baz
    </Tab>
  </Tabs> -->

  <!-- <TBox
    flex-direction="column"
    :height="20"
    border-style="round"
    :width="50"
    :margin="1"
  >
    <TText color="yellow">
      Top
    </TText>
    <TSpacer />
    <TText>Bottom</TText>
  </TBox> -->
</template>
