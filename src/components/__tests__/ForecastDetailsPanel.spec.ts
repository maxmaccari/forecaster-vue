import { describe, it, expect } from 'vitest';

import { mount } from '@vue/test-utils'
import { buildForecast } from '@unit/helpers/forecast'
import { globalMocks } from '@unit/helpers/global'
import ForecastDetailsPanel from '../ForecastDetailsPanel.vue'

const randomDateFromForecast = (forecast) : string => {
  const days : string[] = forecast.details.map(detail => 
    new Date(detail.timestamp * 1000).toISOString().slice(0, 10)
  );
  const dateDays = [...new Set(days)]

  return dateDays[Math.floor(Math.random() * dateDays.length)];
}


const createWrapper = (location: string) => {
  const forecast = buildForecast()
  const date = randomDateFromForecast(forecast)

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

describe('ForecastPanel', () => {
  it('renders the component properly', () => {
    const { wrapper } = createWrapper('berlin')

    expect(wrapper.html()).toMatchSnapshot()
  })
})
