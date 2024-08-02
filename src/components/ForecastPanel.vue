<template>
  <div class="w-full min-w-80 max-w-4xl p-2 text-primary bg-secondary sm:p-4 md:p-6 md:m-4 lg:m-0">
    <ForecastHeader
      :weather="forecast.weather"
      :city="forecast.name"
      :date="date"
    />

    <div class="mt-3 sm:mt-0 flex flex-col sm:flex-row sm:justify-between">
      <div>
        <div class="text-3xl sm:text-5xl leading-none font-normal">
          {{ forecast.name }}
        </div>

        <div class="mt-4 flex flex-wrap items-center">
          <router-link class="btn btn--sm w-full sm:w-fit" :to="{ name: 'Home' }">
            <v-icon file="pencil-icon" class="inline-block w-4 fill-current" />
            <span>Change City</span>
          </router-link>
  
          <div class="mt-2 sm:mt-0 sm:ml-2 text-xs font-light text-gray-darker">
            Data fecthed from OpenWeather® API
          </div>
        </div>
      </div>

      <div class="mt-4 sm:max-w-md sm:grow ">
        <div class="text-lg font-normal sm:text-base sm:font-light">Next 24 hours summary</div>

        <div class="flex flex-wrap">
          <ForecastPanelSummary
            class="w-1/2 mt-2 sm:w-1/3 sm:mt-2"
            :class="{
              'border-gray sm:border-l sm:pl-2': index >= 1,
              'mt-4': index === 2,
            }"
            v-for="(summary, index) in nextHoursSummary"
            :key="index"
            :summary="summary"
          />
        </div>
      </div>
    </div>

    <div class="mt-4 md:mt-8">
      <div class="text-lg leading-6 font-normal">Next Week</div>

      <div
        class="grid grid-flow-row grid-cols-2 gap-2 mt-2 sm:gap-3 sm:grid-cols-3 md:grid-cols-6 md:gap-2"
      >
        <ForecastPanelWeekDay
          v-for="(weather, index) in nextWeek"
          :key="index"
          :weather="weather"
        />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import ForecastHeader from './ForecastHeader.vue'
import ForecastPanelSummary from './ForecastPanelSummary.vue'
import ForecastPanelWeekDay from './ForecastPanelWeekDay.vue'
import { Forecast } from '@/use/forecast'
import { getNextHours, getNextWeek, dateFormat } from '@/utils/forecast'

export default defineComponent({
  name: 'ForecastPanel',
  components: {
    ForecastHeader,
    ForecastPanelSummary,
    ForecastPanelWeekDay,
  },
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
    const date = computed(() =>
      dateFormat.format(new Date(props.forecast.timestamp * 1000))
    )

    const nextHoursSummary = computed(() => getNextHours(props.forecast))

    const nextWeek = computed(() => getNextWeek(props.forecast))

    return { date, nextHoursSummary, nextWeek }
  },
})
</script>
