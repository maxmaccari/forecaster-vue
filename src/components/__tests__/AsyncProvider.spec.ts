import { describe, it, expect } from 'vitest';

import { mount, flushPromises } from '@vue/test-utils'
import { h, defineComponent, Suspense } from 'vue'
import AsyncProvider from '../AsyncProvider.vue'


describe('AsyncProvider', () => {
  it('renders the component in the slot passing the returned data from the provider', async () => {
    const ExampleComponent = defineComponent({
      name: 'ExampleComponent',
      props: ['data'],
      render() {
        return h('div', this.data)
      },
    })
    const data = { content: 'abcdefgh' }
    const provider = async () => await Promise.resolve(data)
    const WrapperComponent = defineComponent({
      render() {
        return h(
          Suspense,
          h(
            AsyncProvider,
            { provider },
            {
              default: (props: any) =>
                h(ExampleComponent, { data: props.data }),
            }
          )
        )
      },
    })
    const wrapper = mount(WrapperComponent)

    await flushPromises()
    const exampleComponent = wrapper.findComponent(ExampleComponent)

    expect(exampleComponent.exists()).toBe(true)
  })
})
