import { h } from 'vue'
import VIcon from '@/components/VIcon.vue'

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
      VIcon: VIcon,
    },
  }
}