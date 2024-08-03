import { describe, it, expect, vi, MockedFunction } from 'vitest';

import { shallowMount, mount, flushPromises } from '@vue/test-utils'
import ForecastDetails from '../ForecastDetails.vue'
import ForecastDetailsPanel from '../../components/ForecastDetailsPanel.vue'
import { useForecast } from '../../use/forecast'
import { buildForecast } from '../../../tests/unit/helpers/forecast'

vi.mock('@/use/forecast')
const mockedUseForecast = useForecast as MockedFunction<typeof useForecast>

describe('ForecastDetails', () => {
  it('renders the view properly', () => {
    const location = 'barcelona'
    const date = '2020-10-01'
    const wrapper = shallowMount(ForecastDetails, { props: { location, date } })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('renders ForecastDetailPanel passing the location, date and the loaded forecast data as props', async () => {
    const data = buildForecast()
    mockedUseForecast.mockResolvedValue(data)
    const location = 'barcelona'
    const date = '2020-10-01'
    const wrapper = mount(ForecastDetails, {
      props: { location, date },
      global: {
        stubs: ['forecast-details-panel'],
      },
    })

    await flushPromises()
    await wrapper.vm.$nextTick()

    const forecastPanelWrapper = wrapper.findComponent(ForecastDetailsPanel)

    expect(forecastPanelWrapper.exists()).toBe(true)
    expect(forecastPanelWrapper.props('location')).toBe(location)
    expect(forecastPanelWrapper.props('date')).toBe(date)
    expect(forecastPanelWrapper.props('forecast')).toEqual(data)
  })
})
