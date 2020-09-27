import { mount } from '@vue/test-utils'
import { h, defineComponent, Suspense } from 'vue'
import AsyncProvider from '../AsyncProvider.vue'
import flushPromises from 'flush-promises'

describe('AsyncProvider', () => {
  it('renders the component in the slot passing the returned data from the provider', async () => {
    const Component = defineComponent({
      props: ['data'],
      render() {
        return h('div', this.data)
      },
    })
    const data = { content: 'abcdefgh' }
    const provider = async () => await Promise.resolve(data)
    const WrapperComponent = () => {
      const providerWrapper = h(AsyncProvider, { provider }, {
        default: (props: any) => h(Component, { data: props.data })
      })
      return h(Suspense, providerWrapper)
    }
    const wrapper = mount(WrapperComponent)

    await flushPromises()
    
    expect(wrapper.html()).toContain(data.content)
  })
})
