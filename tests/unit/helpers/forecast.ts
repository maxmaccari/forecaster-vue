import { Forecast } from '../../../src/use/forecast'
import weatherFixture from '../fixtures/weather.json'
import forecastFixture from '../fixtures/forecast.json'

export const buildForecast = () => {
  return new Forecast(weatherFixture, forecastFixture)
}