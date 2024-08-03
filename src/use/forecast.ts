import sunIcon from '@/assets/icons/021-sun.svg?raw'
import cloudIcon from '@/assets/icons/021-cloud.svg?raw'
import cloudy1Icon from '@/assets/icons/021-cloudy-1.svg?raw'
import nightIcon from '@/assets/icons/021-night.svg?raw'
import night2Icon from '@/assets/icons/021-night-2.svg?raw'
import rain1Icon from '@/assets/icons/021-rain-1.svg?raw'
import rain2Icon from '@/assets/icons/021-rain-2.svg?raw'
import rain3Icon from '@/assets/icons/021-rain-3.svg?raw'
import stormIcon from '@/assets/icons/021-storm.svg?raw'
import snowingicon from '@/assets/icons/021-snowing.svg?raw'
import snowing2Icon from '@/assets/icons/021-snowing-2.svg?raw'
import mist from '@/assets/icons/021-mist.svg?raw'

const ICON_MAPPING: Record<string, string> = {
  '01d': sunIcon,
  '01n': night2Icon,
  '02d': cloudy1Icon,
  '02n': nightIcon,
  '03d': cloudIcon,
  '03n': cloudIcon,
  '04d': cloudIcon,
  '04n': cloudIcon,
  '09d': rain2Icon,
  '09n': rain2Icon,
  '10d': rain1Icon,
  '10n': rain3Icon,
  '11d': stormIcon,
  '11n': stormIcon,
  '13d': snowingicon,
  '13n': snowing2Icon,
  '50d': mist,
  '50n': mist,
}

declare interface ErrorResponse {
  cod: string
  message: string
}

declare interface WindResponse {
  speed: number
  deg: number
}

declare interface WeatherListResponse {
  id: number
  main: string
  description: string
  icon: string
}

declare interface WeatherResponse {
  coord: { lon: number; lat: number }
  weather: WeatherListResponse[]
  base: string
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    humidity: number
  }
  visibility: number
  wind: WindResponse
  clouds: {
    all: number
  }
  dt: number
  sys: {
    type: number
    id: number
    country: string
    sunrise: number
    sunset: number
  }
  timezone: number
  id: number
  name: string
  cod: number
}

declare interface ListResponse {
  dt: number
  main: {
    temp: number
    feels_like: number
    temp_min: number
    temp_max: number
    pressure: number
    sea_level: number
    grnd_level: number
    humidity: number
    temp_kf: number
  }
  weather: WeatherListResponse[]
  clouds: { all: number }
  wind: WindResponse
  visibility: number
  pop: number
  sys: { pod: string }
  dt_txt: string
}

declare interface ForecastResponse {
  cod: string
  message: number
  cnt: number
  list: ListResponse[]
  city: {
    id: number
    name: string
    coord: { lat: number; lon: number }
    country: string
    population: number
    timezone: number
    sunrise: number
    sunset: number
  }
}

export declare interface WeatherCommons {
  description : string | null
  icon : string | null
  min : number
  max : number
  temperature : number
  feelsLike : number
}

export class Weather implements WeatherCommons {
  description: string | null = null
  icon: string | null = null
  temperature = 0
  min = 0
  max = 0
  feelsLike = 0
  humidity = 0
  pressure = 0

  constructor(weather: WeatherResponse | ListResponse | null = null) {
    if (!weather) return

    this.description = weather.weather[0]
      ? weather.weather[0].description
      : null
    this.icon = weather.weather[0]
      ? ICON_MAPPING[weather.weather[0].icon]
      : null
    this.temperature = weather.main.temp
    this.min = weather.main.temp_min
    this.max = weather.main.temp_max
    this.feelsLike = weather.main.feels_like
    this.humidity = weather.main.humidity
    this.pressure = weather.main.pressure
  }
}

export class Wind {
  direction = 0
  speed = 0

  constructor(windResponse: WindResponse | null = null) {
    this.direction = windResponse?.deg || 0
    this.speed = windResponse?.speed || 0
  }
}

export class ForecastDetails {
  clouds = 0
  timestamp = 0
  weather: Weather = new Weather()
  wind: Wind = new Wind()

  constructor(details: ListResponse) {
    this.clouds = details.clouds.all
    this.timestamp = details.dt
    this.weather = new Weather(details)
    this.wind = new Wind(details.wind)
  }
}

export class Forecast {
  name = ''
  country = ''
  timestamp = 0
  timezone = 0
  weather: Weather = new Weather()
  wind: Wind = new Wind()
  details: ForecastDetails[] = []

  constructor(weather: WeatherResponse, forecast: ForecastResponse) {
    this.name = weather.name
    this.country = forecast.city.country
    this.timestamp = weather.dt
    this.timezone = weather.timezone
    this.weather = new Weather(weather)
    this.wind = new Wind(weather.wind)
    this.details = forecast.list.map(details => {
      return new ForecastDetails(details)
    })
  }
}

class CacheHash {
  [Identifier: string]: Forecast
}

let cache: CacheHash = new CacheHash()

const API_URL = import.meta.env.VITE_APP_API_URL
const API_KEY = import.meta.env.VITE_APP_API_KEY

const parseError = (response: Response): ErrorResponse => {
  return (response.json() as Record<string, any>) as ErrorResponse
}

const throwError = async (response: Response) => {
  const responseError = await parseError(response)

  throw {
    message: responseError.message,
    response,
  }
}

const isCoord = (coord : string) : boolean => {
  const regex = new RegExp(/^(lat=)(-?\d+\.?\d*)&(lon=)(-?\d+\.?\d*)$/, 'g')

  return regex.test(coord);
}

export const fetchWeather = (location: string): Promise<WeatherResponse> => {
  const locationQuery = isCoord(location) ? location : `q=${location}`;

  const url = `${API_URL}/weather?${locationQuery}&appid=${API_KEY}&units=metric`

  return window.fetch(url).then(async response => {
    if (response.status !== 200) {
      await throwError(response)
    }

    return (response.json() as Record<string, any>) as WeatherResponse
  })
}

export const fetchForecast = (location: string): Promise<ForecastResponse> => {
  const locationQuery = isCoord(location) ? location : `q=${location}`;

  const url = `${API_URL}/forecast?${locationQuery}&appid=${API_KEY}&units=metric`

  return window.fetch(url).then(async response => {
    if (response.status !== 200) {
      await throwError(response)
    }

    return (await (response.json() as Record<string, any>)) as ForecastResponse
  })
}

export const clearCache = () => {
  cache = new CacheHash()
}

export const useForecast = async (location: string): Promise<Forecast> => {
  if (cache[location]) return cache[location]

  const [weatherJson, forecastJson] = await Promise.all([
    fetchWeather(location),
    fetchForecast(location),
  ])

  const forecast = new Forecast(weatherJson, forecastJson)
  cache[location] = forecast

  return forecast
}
