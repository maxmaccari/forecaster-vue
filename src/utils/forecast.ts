import { Forecast } from '@/use/forecast'

declare interface NextHoursEntry {
  temperature: number,
  time: string,
  clouds: number,
  icon: string | null
}

declare interface NextWeekEntry {
  day: string
  min: number
  clouds: number
  icon: string | null
  temperature: number
  description: string | null
}

export const dateFormat = new Intl.DateTimeFormat('en-US', {
  day: 'numeric',
  weekday: 'long',
})

export const timeFormat = new Intl.DateTimeFormat('en-US', {
  hour: 'numeric',
  minute: 'numeric',
})

export const getNextHours = (forecast: Forecast) : NextHoursEntry[] => {
  return [
    forecast.details[0],
    forecast.details[2],
    forecast.details[4],
  ].map(detail => ({
    temperature: Math.round(detail.weather.temperature),
    time: timeFormat.format(new Date(detail.timestamp * 1000)),
    clouds: detail.clouds,
    icon: detail.weather.icon,
  }))
}

export const getNextWeek = (forecast: Forecast) : NextWeekEntry[] => {
  return forecast.details.reduce(
    ( week: NextWeekEntry[], detail ) => {
      const date = new Date(detail.timestamp * 1000)
      const day = dateFormat.format(date)
      const forecast = week.find((forecast) => forecast.day === day)

      if (!forecast) {
        week.push({
          day,
          clouds: detail.clouds,
          min: Math.round(detail.weather.minTemperature),
          icon: detail.weather.icon,
          temperature: Math.round(detail.weather.temperature),
          description: detail.weather.description,
        })
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