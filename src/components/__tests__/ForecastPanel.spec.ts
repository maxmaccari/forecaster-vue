import { shallowMount } from '@vue/test-utils'
import ForecastPanel from '../ForecastPanel.vue'

describe('ForecastPanel', () => {
  it('renders the component properly', () => {
    const location = 'berlin'
    const wrapper = shallowMount(ForecastPanel, {
      props: {
        location,
        forecast: {}
      },
      global: {
        components: {
          VIcon: {},
          RouterLink: {}
        },
      }
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
