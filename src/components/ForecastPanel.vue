<template>
  <div class="w-full max-w-4xl p-2 text-indigo-900 bg-gray-100 sm:p-4 md:p-6">
    <div class="flex flex-wrap">
      <span class="mr-4 text-6xl leading-none align-text-top">
        {{ Math.round(forecast.weather.temperature) }}º
      </span>
      <div class="flex flex-col mt-1 text-indigo-800">
        <div class="border-gray-400 sm:border-l sm:pl-2">
          {{ formattedDate }}
        </div>
        <div class="flex items-center mt-1">
          <div>
            <VIcon :file="forecast.weather.icon" class="w-8" />
          </div>
          <div class="flex flex-col ml-2 text-xs">
            <span class="capitalize">
              {{ forecast.weather.description }}
            </span>
            <span>
              Fees like: {{ Math.round(forecast.weather.feelsLike) }}º
            </span>
          </div>
        </div>
      </div>
      <div
        class="flex flex-col w-full mt-1 border-gray-400 sm:border-l sm:pl-2 sm:ml-4 sm:w-auto"
      >
        <div>
          <span class="font-light">Min</span>:
          {{ forecast.weather.minTemperature }}º
        </div>
        <div>
          <span class="font-light">Max</span>:
          {{ forecast.weather.maxTemperature }}º
        </div>
      </div>
    </div>

    <div class="flex flex-col sm:flex-row sm:justify-between">
      <div>
        <div class="text-3xl sm:text-4xl">
          {{ forecast.name }}
        </div>

        <router-link class="sm:block sm:w-48 change-btn" :to="{ name: 'Home' }">
          <v-icon file="pencil-icon" class="inline-block w-4 fill-current" />
          <span>Change City</span>
        </router-link>

        <div class="mt-1 text-sm text-gray-400 sm:text-xs">
          Data fecthed from OpenWeather® API
        </div>
      </div>

      <div class="mt-2 sm:max-w-md sm:flex-grow sm:mt-4">
        <div class="sm:text-sm">Next 24 hours summary</div>

        <div class="flex flex-wrap">
          <div
            class="flex w-1/2 mt-2 sm:w-1/3 sm:mt-2"
            :class="{
              'border-gray-400 sm:border-l sm:pl-2': index >= 1,
              'mt-4': index === 2,
            }"
            v-for="(summary, index) in nextHoursSummary"
            :key="index"
          >
            <div><v-icon :file="summary.icon" class="w-8" /></div>
            <div class="ml-2">
              <div class="text-3xl font-bold leading-none sm:text-2xl">
                {{ summary.temperature }}º
              </div>
              <div class="text-lg font-light sm:text-base sm:mt-1">
                {{ summary.time }}
              </div>
              <div class="text-sm text-gray-600 sm:text-xs">
                {{ summary.clouds }}% cloudness
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="mt-4 md:mt-8">
      <div class="text-lg">Next Week</div>

      <div
        class="grid grid-flow-row grid-cols-2 gap-2 mt-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-2"
      >
        <div
          v-for="(weather, index) in nextWeek"
          :key="index"
          class="relative p-2 text-indigo-100 bg-indigo-900 cursor-pointer hover:bg-indigo-800"
        >
          <div class="md:text-sm">{{ weather.day }}</div>
          <v-icon
            :file="weather.icon"
            class="w-20 mx-auto mt-1 md:w-16 md:mt-2"
          />
          <div class="mt-1 text-xl font-bold md:text-lg md:mt-2">37º</div>
          <div class="text-sm capitalize md:text-xs md:mt-2">
            {{ weather.description }}
          </div>
          <div class="text-xs capitalize md:mt-1">
            {{ weather.clouds }}% cloudiness
          </div>
          <div class="text-xs capitalize md:mt-1">Min: {{ weather.min }}º</div>
          <v-icon
            file="circle-right"
            class="absolute bottom-0 right-0 w-5 mb-2 mr-2 fill-current md:w-4"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Forecast } from '@/use/forecast'
import { getNextHours, getNextWeek, dateFormat } from '@/utils/forecast'

export default defineComponent({
  name: 'ForecastPanel',
  props: {
    forecast: {
      type: Forecast,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
  },
  setup(props) {
    const formattedDate = computed(() =>
      dateFormat.format(new Date(props.forecast.timestamp * 1000))
    )

    const nextHoursSummary = computed(() => getNextHours(props.forecast))

    const nextWeek = computed(() => getNextWeek(props.forecast))

    return { formattedDate, nextHoursSummary, nextWeek }
  },
})
</script>

<style scoped>
.change-btn {
  @apply flex items-center justify-center py-1 text-sm text-center text-indigo-900 bg-gray-400;

  &:hover {
    @apply bg-gray-300;
  }
}
</style>
