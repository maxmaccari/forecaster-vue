<template>
  <div class="flex">
    <VIcon :file="detail.weather.icon" class="w-8" />
    <div class="flex flex-col ml-3">
      <div>{{ formattedTime }}</div>
      <div class="flex">
        <div class="font-bold">{{detail.weather.temperature}}º</div>
        <div class="ml-2 capitalize">{{ detail.weather.description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {defineComponent, computed} from 'vue';
import { ForecastDetails } from '@/use/forecast'
import { timeFormat} from '@/utils/forecast'

export default defineComponent({
  name: 'ForecastDetailsPanelTimeWeather',
  components: {  },
  props: {
    detail: {
      type: ForecastDetails,
      required: true
    },
  },
  setup(props) {
    const formattedTime = computed(() => timeFormat.format(props.detail.timestamp * 1000));

    return { formattedTime }
  }
})

</script>