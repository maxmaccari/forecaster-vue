declare interface WindResponse {
  speed: number
  deg: number
}

declare interface WeatherResponse {
  coord: { lon: number; lat: number }
  weather: {
    id: number
    main: string
    description: string
    icon: string
  }[]
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
  weather: [
    {
      id: number
      main: string
      description: string
      icon: string
    }
  ]
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

export class Weather {
  description: string | null = null
  icon: string | null = null
  temperature = 0
  minTemperature = 0
  maxTemperature = 0
  feelsLike = 0
  humidity = 0
  pressure = 0

  constructor(weather: WeatherResponse | ListResponse | null = null) {
    if (!weather) return

    this.description = weather.weather[0]
      ? weather.weather[0].description
      : null
    this.icon = weather.weather[0] ? weather.weather[0].icon : null
    this.temperature = weather.main.temp
    this.minTemperature = weather.main.temp_min
    this.maxTemperature = weather.main.temp_max
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
  }
}

export class Forecast {
  name = ''
  country = ''
  weather: Weather = new Weather()
  wind: Wind = new Wind()
  details: ForecastDetails[] = []

  constructor(weather: WeatherResponse, forecast: ForecastResponse) {
    this.name = weather.name
    this.country = forecast.city.country
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

const API_URL = process.env.VUE_APP_API_URL
const API_KEY = process.env.VUE_APP_API_KEY

export const fetchWeather = (location: string): Promise<WeatherResponse> => {
  const url = `${API_URL}/weather?q=${location}&appid=${API_KEY}&units=metric`

  return window.fetch(url).then(response => {
    return (response.json() as Record<string, any>) as WeatherResponse
  })
}

export const fetchForecast = (location: string): Promise<ForecastResponse> => {
  const url = `${API_URL}/forecast?q=${location}&appid=${API_KEY}&units=metric`

  return window.fetch(url).then(response => {
    return (response.json() as Record<string, any>) as ForecastResponse
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
