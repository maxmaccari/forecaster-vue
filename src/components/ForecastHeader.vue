<template>
  <div class="flex justify-between sm:justify-start">
    <span class="text-7xl sm:text-8xl leading-none align-text-top">
      {{ Math.round(weather.temperature) }}º
    </span>
    <div class="ml-2 sm:ml-4 flex flex-col mt-1 text-primary">
      <div class="w-max text-lg font-light border-gray-darker sm:border-l sm:pl-2">
        {{ date }}
      </div>
      <div class="mt-4 flex items-center text-primary text-sm leading-6 font-light">
        <div>
          <VIcon :file="weather.icon" class="w-8" />
        </div>
        <div class="flex flex-col ml-2">
          <span class="capitalize">
            {{ weather.description }}
          </span>
          <span> Fees like: {{ Math.round(weather.feelsLike) }}º </span>
        </div>
      </div>
    </div>
    <div
      class="ml-1 pl-3 sm:pl-2 sm:ml-4 self-end sm:self-start flex flex-col  border-gray-darker border-l sm:justify-center text-lg leading-5 font-light "
    >
      <div>
        <span class="font-light">Min</span>:
        <span class="font-bold">{{ Math.round(weather.minTemperature) }}º</span>
      </div>
      <div>
        <span class="font-light">Max</span>:
        <span class="font-bold">{{ Math.round(weather.maxTemperature) }}º</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  functional: true,
  props: {
    city: {
      type: String,
      required: true,
    },
    weather: {
      type: Object,
      required: true,
    },
    date: {
      type: String,
      required: true,
    },
  },
})
</script>
