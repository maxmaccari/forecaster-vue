<template>
  <router-link
    :to="{ name: 'ForecastDetails', params: { date: weather.isoDate } }"
    class="relative p-2 text-white bg-primary cursor-pointer hover:bg-primary-darker"
  >
    <div class="md:text-sm">{{ weather.day }}</div>
    <span v-html="weather.icon" class="w-20 mx-auto mt-1 md:w-16 md:mt-2" />
    <div class="mt-1 text-xl font-bold md:text-lg md:mt-2">37º</div>
    <div class="text-sm capitalize md:text-xs md:mt-2">
      {{ weather.description }}
    </div>
    <div class="text-xs text-gray capitalize md:mt-1">
      {{ weather.clouds }}% cloudiness
    </div>
    <div class="text-xs text-gray capitalize md:mt-1">Min: {{ weather.min }}º</div>
    <CircleRight class="absolute bottom-0 right-0 w-5 mb-2 mr-2 fill-current md:w-4" />
  </router-link>
</template>

<script lang="ts" setup>
  import { WeatherSummary } from '@/utils/forecast'
  import CircleRight from '@/assets/icons/circle-right.svg?component'

  defineOptions({ functional: true })

  defineProps({
    weather: {
      type: WeatherSummary,
      required: true,
    },
  })
</script>
