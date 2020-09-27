import { useForecast, clearCache } from '../forecast'
import mockWeather from './fixtures/weather.json'
import mockForecast from './fixtures/forecast.json'
import { Response } from './helpers/fetch'

describe('useForecast', () => {
  beforeEach(() => {
    clearCache()
    window.fetch = jest.fn()
    jest.spyOn(window, 'fetch').mockImplementation(url => {
      if (url.includes('/forecast')) {
        return Promise.resolve(new Response(mockForecast))
      } else {
        return Promise.resolve(new Response(mockWeather))
      }
    })
  })

  afterEach(() => {
    delete window.fetch
  })

  it('calls fetch to weather and forecast endpoints with the location', async () => {
    const location = 'berlin'
    await useForecast(location)

    expect(window.fetch).toBeCalledTimes(2)
    expect(window.fetch).toHaveBeenCalledWith(
      'https://api-url.com/forecast?q=berlin&appid=FAKE_API_KEY&units=metric'
    )
    expect(window.fetch).toHaveBeenCalledWith(
      'https://api-url.com/weather?q=berlin&appid=FAKE_API_KEY&units=metric'
    )
  })

  it('gets a forecast object with the data of the location based on the responses', async () => {
    const location = 'berlin'
    const forecast = await useForecast(location)

    expect(forecast.name).toBe(mockWeather.name)
    expect(forecast.weather.description).toBe(
      mockWeather.weather[0].description
    )
    expect(forecast.details).toHaveLength(mockForecast.list.length)
  })
})
