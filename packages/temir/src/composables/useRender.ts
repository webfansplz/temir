import type { Component } from '@vue/runtime-core'
import { inject } from '@vue/runtime-core'
import type Temir from '../temir'

export const useRender = () => {
  const instance = inject<InstanceType<typeof Temir>>('instance')
  function render(node: Component) {
    instance.render(node)
  }
  return render
}

