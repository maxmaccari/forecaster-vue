import { buildForecast } from '@unit/helpers/forecast'
import { getNextHours, getNextWeek } from '../forecast'

const forecast = buildForecast()

describe('getNextHours', () => {
  it('should return the next hours data based on the forecast data', function() {
    expect(getNextHours(forecast)).toMatchSnapshot()
  })
})

describe('getNextWeek', () => {
  it('should return the next week data based on the forecast data', function() {
    expect(getNextWeek(forecast)).toMatchSnapshot()
  })
})
