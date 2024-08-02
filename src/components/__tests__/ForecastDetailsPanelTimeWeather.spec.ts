import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils'
import { buildForecast } from '@unit/helpers/forecast'
import { globalMocks } from '@unit/helpers/global'
import ForecastDetailsPanelTimeWeather from '../ForecastDetailsPanelTimeWeather.vue'
import { getDetailsNextHours } from '@/utils/forecast';

const createWrapper = () => {
  const forecast = buildForecast()

  const detail = getDetailsNextHours(forecast, new Date('2020-10-01T00:00:00'))[0]

  const wrapper = mount(ForecastDetailsPanelTimeWeather, {
    props: {
      detail
    },
    global: globalMocks(),
  })

  return { wrapper, forecast }
}

describe('ForecastDetailsPanelTimeWeather.spec', () => {
  it('renders the component properly', () => {
    const { wrapper } = createWrapper()

    expect(wrapper.html()).toMatchSnapshot()
  })
})
