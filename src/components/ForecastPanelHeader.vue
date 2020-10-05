<template>
  <div class="flex flex-wrap">
    <span class="mr-4 text-6xl leading-none align-text-top">
      {{ Math.round(forecast.weather.temperature) }}º
    </span>
    <div class="flex flex-col mt-1 text-indigo-800">
      <div class="border-gray-400 sm:border-l sm:pl-2">
        {{ formatDate(forecast.timestamp) }}
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
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Forecast } from '@/use/forecast'

export default defineComponent({
  functional: true,
  props: {
    forecast: {
      type: Forecast,
      required: true,
    },

    formatDate: {
      type: Function,
      required: true,
    },
  },
})
</script>
