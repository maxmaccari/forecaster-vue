import { mount } from '@vue/test-utils'
import { buildForecast } from '@unit/helpers/forecast'
import ForecastPanel from '../ForecastPanel.vue'

const createWrapper = (location: string) => {
  const forecast = buildForecast()

  const wrapper = mount(ForecastPanel, {
    props: {
      location,
      forecast,
    },
    
  })

  return { wrapper, forecast }
}

describe('ForecastPanel', () => {
  it('renders the component properly', () => {
    const { wrapper } = createWrapper('berlin')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
