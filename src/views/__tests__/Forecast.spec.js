import { shallowMount, mount } from '@vue/test-utils'
import Forecast from '../Forecast.vue'
import ForecastPanel from '@/components/ForecastPanel.vue'
import flushPromises from 'flush-promises'
import { useForecast } from '@/use/forecast'

jest.mock('@/use/forecast')

describe('Forecast', () => {
  it('renders the view properly', () => {
    const location = 'barcelona'
    const wrapper = shallowMount(Forecast, { props: { location } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders ForecastPanel passing the location and the loaded forecast data as props', async () => {
    const data = {}
    useForecast.mockResolvedValue(data)
    const location = 'barcelona'
    const wrapper = mount(Forecast, {
      props: { location },
    })

    await flushPromises()
    await wrapper.vm.$nextTick()

    const forecastPanelWrapper = wrapper.findComponent(ForecastPanel)

    expect(forecastPanelWrapper.exists()).toBe(true)
    expect(forecastPanelWrapper.props('location')).toBe(location)
    expect(forecastPanelWrapper.props('forecast')).toEqual(data)
  })
})
