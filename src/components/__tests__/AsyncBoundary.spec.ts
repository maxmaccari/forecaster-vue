import { describe, it, expect } from 'vitest';
;
import { mount, flushPromises } from '@vue/test-utils'
import { h, defineComponent } from 'vue'
import AsyncBoundary from '../AsyncBoundary.vue'
import LoadingPanel from '../../components/LoadingPanel.vue'
import ErrorPanel from '../../components/ErrorPanel.vue'

const createWrapper = (options: object) =>
  mount(AsyncBoundary, {
    global: {
      stubs: ['loading-panel', 'error-panel'],
    },
    ...options,
  })

describe('AsyncBoundary', () => {
  it('renders the component in the slot if is a common component', async () => {
    
    const Component = defineComponent({
      render() {
        return h('div', 'content')
      },
    })
    const wrapper = createWrapper({ slots: { default: h(Component) } })

    await flushPromises()

    expect(wrapper.findComponent(Component).exists()).toBe(true)
  })

  it('renders the async component if the component is loaded', async () => {
    const AsyncComponent = defineComponent({
      render() {
        return h('div', 'content')
      },
      async setup() {
        return {}
      },
    })
    const wrapper = createWrapper({ slots: { default: h(AsyncComponent) } })

    await flushPromises()

    expect(wrapper.findComponent(AsyncComponent).exists()).toBe(true)
  })

  it('renders LoadingPanel if the component in the slot is still loading', () => {
    const AsyncComponent = {
      async setup() {
        await new Promise(() => {
          /* empty */
        })
      },
    }
    const wrapper = createWrapper({ slots: { default: h(AsyncComponent) } })

    const loadingPanelWrapper = wrapper.findComponent(LoadingPanel)

    expect(loadingPanelWrapper.exists()).toBe(true)
  })

  // TODO: Fix these errors 

  // it('renders ErrorPanel with the error if it has an error', async () => {
  //   const error = { message: 'error message' }
  //   const AsyncComponent = {
  //     async setup() {
  //       await Promise.reject(error)
  //     },
  //   }

  //   const wrapper = createWrapper({ slots: { default: h(AsyncComponent) } })

  //   await flushPromises()

  //   const errorWrapper = wrapper.findComponent(ErrorPanel)

  //   expect(errorWrapper.props('error')).toEqual(error)
  // })

  // it('re-renders the suspense in case of receive the try-again event from the ErrorPanel', async () => {
  //   const error = { message: 'error message' }
  //   const AsyncComponent = {
  //     async setup() {
  //       await Promise.reject(error)
  //     },
  //   }
  //   const wrapper = createWrapper({ slots: { default: h(AsyncComponent) } })

  //   await flushPromises()

  //   const errorWrapper = wrapper.findComponent(ErrorPanel)
  //   errorWrapper.vm.$emit('try-again')

  //   await wrapper.vm.$nextTick()

  //   expect(wrapper.findComponent(LoadingPanel).exists()).toBe(true)
  // })
})
