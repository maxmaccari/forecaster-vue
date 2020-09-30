import { shallowMount } from '@vue/test-utils'
import { buildForecast } from '@unit/helpers/forecast'
import ForecastPanel from '../ForecastPanel.vue'

const createWrapper = (location: string) => {
  const forecast = buildForecast()
  
  const wrapper = shallowMount(ForecastPanel, {
    props: {
      location,
      forecast
    },
    global: {
      components: {
        VIcon: {},
        RouterLink: {}
      },
    }
  })

  return { wrapper, forecast }
}

describe('ForecastPanel', () => {
  it('renders the component properly', () => {
    const { wrapper } = createWrapper('berlin')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
