<template>
  <AsyncBoundary>
    <AsyncProvider :provider="provider" v-slot="{ data }">
      <ForecastPanel :forecast="data" :location="location" v-if="data" />
    </AsyncProvider>
  </AsyncBoundary>
</template>

<script lang="ts" setup>
  import ForecastPanel from '@/components/ForecastPanel.vue'
  import AsyncBoundary from '@/components/AsyncBoundary.vue'
  import AsyncProvider from '@/components/AsyncProvider.vue'
  import { useForecast } from '@/use/forecast'

  const props = defineProps({
    location: {
      type: String,
      required: true,
    }
  })

  const provider = async () => {
    return await useForecast(props.location)
  }
</script>
