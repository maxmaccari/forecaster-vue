import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils'
import { buildForecast } from '@unit/helpers/forecast'
import { globalMocks } from '@unit/helpers/global'
import ForecastDetailsPanel from '../ForecastDetailsPanel.vue'


const createWrapper = (location: string, date: string) => {
  const forecast = buildForecast()

  const wrapper = mount(ForecastDetailsPanel, {
    props: {
      location,
      forecast,
      date
    },
    global: globalMocks(),
  })

  return { wrapper, forecast }
}

describe('ForecastDetailsPanel', () => {
  it('renders the component properly', () => {
    const { wrapper } = createWrapper('berlin', '2020-10-01')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
