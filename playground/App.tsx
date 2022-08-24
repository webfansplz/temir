import { TBox, TText } from '@temir/core'
import { defineComponent, ref } from 'vue'

export default defineComponent({
  setup() {
    const count = ref(1)
    setInterval(() => {
      count.value++
    }, 1000)
    return () => (
      <TBox>
        <TText>{count.value}</TText>
      </TBox>
    )
  },
})
