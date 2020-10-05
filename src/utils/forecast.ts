import { Forecast } from '@/use/forecast'

export class NextHoursSummary {
  constructor(
    public temperature: number,
    public time: string,
    public clouds: number,
    public icon: string | null
  ) {}
}

export class NextWeekEntry {
  constructor(
    public day: string,
    public clouds: number,
    public min: number,
    public temperature: number,
    public icon: string | null,
    public description: string | null
  ) {}
}

export const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  weekday: 'long',
})

export const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
})

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

export const getNextWeek = (forecast: Forecast): NextWeekEntry[] => {
  return forecast.details.reduce((week: NextWeekEntry[], detail) => {
    const date = new Date(detail.timestamp * 1000)
    const day = dateFormat.format(date)
    const forecast = week.find(forecast => forecast.day === day)

    if (!forecast) {
      week.push(new NextWeekEntry(day, 
        detail.clouds,
        Math.round(detail.weather.minTemperature),
        Math.round(detail.weather.temperature),
        detail.weather.icon,
        detail.weather.description,
      ))
    } else {
      if (detail.weather.minTemperature < forecast.min) {
        forecast.min = Math.round(detail.weather.minTemperature)
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
