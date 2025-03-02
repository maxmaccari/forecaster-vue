<template>
  <div class="flex">
    <span v-html="detail.weather.icon" class="w-8" />
    <div class="flex flex-col ml-3">
      <div>{{ formattedTime }}</div>
      <div class="flex">
        <div class="font-bold">{{detail.weather.temperature}}º</div>
        <div class="ml-2 capitalize">{{ detail.weather.description }}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { computed } from 'vue';
  import { ForecastDetails } from '@/use/forecast'
  import { timeFormat} from '@/utils/forecast'

  const props = defineProps({
    detail: {
      type: ForecastDetails,
      required: true
    },
  })

  const formattedTime = computed(() => timeFormat.format(props.detail.timestamp * 1000));
</script>