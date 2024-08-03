import { h } from 'vue'

export const globalMocks = () => {
  return {
    components: {
      RouterLink: {
        name: 'router-link',
        props: ['to'],
        render() {
          return h('router-link')
        }
      },
    },
  }
}