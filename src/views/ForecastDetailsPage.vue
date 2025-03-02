<template>
  <AsyncBoundary>
    <AsyncProvider :provider="provider" v-slot="{ data }">
      <ForecastDetailsPanel :forecast="data" :location="location" :date="date" v-if="data" />
    </AsyncProvider>
  </AsyncBoundary>
</template>
<script lang="ts" setup>
import AsyncBoundary  from '@/components/AsyncBoundary.vue';
import AsyncProvider from '@/components/AsyncProvider.vue';
import ForecastDetailsPanel from '@/components/ForecastDetailsPanel.vue';
import { useForecast } from '@/use/forecast'

  const props = defineProps({
    location: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  });

  const provider =  async () => {
    return await useForecast(props.location)
  }

</script>