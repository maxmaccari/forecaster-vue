<template>
  <div class="w-full max-w-4xl p-2 text-indigo-900 bg-gray-100 sm:p-4 md:p-6">
    <ForecastPanelHeader :forecast="forecast" :formatDate="formatDate" />

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
          <ForecastPanelSummary
            class="w-1/2 mt-2 sm:w-1/3 sm:mt-2"
            :class="{
              'border-gray-400 sm:border-l sm:pl-2': index >= 1,
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
      <div class="text-lg">Next Week</div>

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
import ForecastPanelHeader from './ForecastPanelHeader.vue'
import ForecastPanelSummary from './ForecastPanelSummary.vue'
import ForecastPanelWeekDay from './ForecastPanelWeekDay.vue'
import { Forecast } from '@/use/forecast'
import { getNextHours, getNextWeek, dateFormat } from '@/utils/forecast'

export default defineComponent({
  name: 'ForecastPanel',
  components: {
    ForecastPanelHeader,
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
    const formatDate = (timestamp: number) =>
      dateFormat.format(new Date(timestamp * 1000))

    const nextHoursSummary = computed(() => getNextHours(props.forecast))

    const nextWeek = computed(() => getNextWeek(props.forecast))

    return { formatDate, nextHoursSummary, nextWeek }
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
