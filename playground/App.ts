import { computed, defineComponent, h, ref } from '@vue/runtime-core'
import { TBox, TText } from '@temir/core'

export default defineComponent({
  setup() {
    const count = ref(0)
    const j = computed(() => count.value === 0 ? 'center' : 'flex-start')
    const c = computed(() => count.value === 0 ? 'red' : 'yellow')

    setInterval(() => {
      // count.value++
      count.value = count.value === 0 ? 1 : 0
    }, 1000)

    return () => h(TBox, {
      width: 80,
      justifyContent: j.value,
      borderStyle: 'round',
      marginRight: 2,
    }, h(TText, {
      color: c.value,
    }, 'Hello World!!'))
  },
})

