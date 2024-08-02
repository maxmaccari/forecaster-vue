import { Forecast, ForecastDetails, Wind, type WeatherCommons } from '@/use/forecast'

export const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  weekday: 'long',
})

export const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
})

export class NextHoursSummary {
  constructor(
    public temperature: number,
    public time: string,
    public clouds: number,
    public icon: string | null
  ) {}
}

export class WeatherSummary implements WeatherCommons {
  constructor(
    public date: Date,
    public clouds: number,
    public min: number,
    public max: number,
    public temperature: number,
    public feelsLike: number,
    public icon: string | null,
    public description: string | null,
    public humidity : number,
    public pressure : number,
    public wind : Wind
  ) {}

  get day() {
    return dateFormat.format(this.date)
  }

  get isoDate() {
    return this.date.toISOString().slice(0, 10)
  }
}

export const getNextHours = (forecast: Forecast): NextHoursSummary[] => {
  return [forecast.details[0], forecast.details[2], forecast.details[4]].map(
    detail => new NextHoursSummary(
      Math.round(detail.weather.temperature),
      timeFormat.format(new Date(detail.timestamp * 1000)),
      detail.clouds,
      detail.weather.icon,
    )
  )
}

export const getNextWeek = (forecast: Forecast): WeatherSummary[] => {
  return forecast.details.reduce((week: WeatherSummary[], detail) => {
    const date = new Date(detail.timestamp * 1000)
    const day = dateFormat.format(date)
    const forecast = week.find(forecast => forecast.day === day)

    if (!forecast) {
      week.push(new WeatherSummary(
        date, 
        detail.clouds,
        Math.round(detail.weather.min),
        Math.round(detail.weather.max),
        Math.round(detail.weather.temperature),
        Math.round(detail.weather.feelsLike),
        detail.weather.icon,
        detail.weather.description,
        detail.weather.humidity,
        detail.weather.pressure,
        detail.wind
      ))
    } else {
      if (detail.weather.min < forecast.min) {
        forecast.min = Math.round(detail.weather.min)
      }

      if (detail.weather.temperature > forecast.temperature) {
        forecast.temperature = Math.round(detail.weather.temperature)
      }

      if (date.getHours() > 10 && date.getHours() < 14) {
        forecast.icon = detail.weather.icon
      }
    }

    return week
  }, [])
}

export const getDetailsWeather = (forecast: Forecast, date : Date) : WeatherSummary => {
  const entry = getNextWeek(forecast).find(day => day.day === dateFormat.format(date));

  if (!entry) {
    throw "Weather not found for day: " + dateFormat.format(date)
  }

  return entry;
}

export const getDetailsNextHours = (forecast : Forecast, date : Date) : ForecastDetails[] => {
  const day = dateFormat.format(date)
  return forecast.details.filter(detail => dateFormat.format(new Date(detail.timestamp * 1000)) === day);
}
