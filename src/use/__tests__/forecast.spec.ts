import { useForecast, clearCache } from '../forecast'
import mockWeather from '@unit/fixtures/weather.json'
import mockForecast from '@unit/fixtures/forecast.json'
import { Response } from '@unit/helpers/fetch'

describe('useForecast', () => {
  beforeEach(() => {
    (window as any).fetch = jest.fn((url: string) => {
      if (url.includes('/forecast')) {
        return Promise.resolve(new Response(mockForecast))
      } else {
        return Promise.resolve(new Response(mockWeather))
      }

      clearCache()
    })
  })

  afterEach(() => {
    if ((window as any).fetch) {
      delete (window as any).fetch
    }
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
