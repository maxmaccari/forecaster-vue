import { describe, it, expect } from 'vitest'

import { buildForecast } from '@unit/helpers/forecast'
import { getDetailsWeather, getNextHours, getNextWeek, dateFormat, getDetailsNextHours } from '../forecast'

const forecast = buildForecast()
const randomDateFromForecast = () => {
  const days = forecast.details.map(detail => 
    new Date(detail.timestamp * 1000).toISOString().slice(0, 10)
  );
  const dateDays = [...new Set(days)]
    .map(date => new Date(`${date}T00:00:00`))

  return dateDays[Math.floor(Math.random() * dateDays.length)];
}

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

describe('getDetailsWeather', () => {
  it('should return the weather from the day based on the forecast data', function() {
    const date = randomDateFromForecast();
    const weather = getDetailsWeather(forecast, date);

    expect(weather.isoDate).toBe(date.toISOString().slice(0, 10))
  })
})

describe('getDetailsNextHours', () => {
  it('should return the forecasts for the given day', function() {
    const date = randomDateFromForecast();
    const nextHoursDetails = getDetailsNextHours(forecast, date);
    const nextHoursDetailsDays = nextHoursDetails
      .map(detail => dateFormat.format(new Date(detail.timestamp * 1000)));

    for (const day of nextHoursDetailsDays) {
      expect(day).toBe(dateFormat.format(date))
    }
  })
})