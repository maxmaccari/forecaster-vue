<template>
  <div class="flex items-center justify-center min-h-screen">
    <AsyncBoundary>
      <AsyncProvider :provider="provider" v-slot="{ data }">
        <ForecastDetailsPanel :forecast="data" :location="location" :date="date" />
      </AsyncProvider>
    </AsyncBoundary>
  </div>
</template>
<script lang="ts">
import {defineComponent} from 'vue';
import AsyncBoundary  from '@/components/AsyncBoundary.vue';
import AsyncProvider from '@/components/AsyncProvider.vue';
import ForecastDetailsPanel from '@/components/ForecastDetailsPanel.vue';
import { useForecast } from '@/use/forecast'

const Component = defineComponent({
  name: 'ForecastDetails',
  components: { AsyncBoundary, AsyncProvider, ForecastDetailsPanel },
  props: {
    location: {
      type: String,
      required: true
    },
    date: {
      type: String,
      required: true
    }
  },
  methods: {
    async provider() {
      return await useForecast(this.location)
    }
  }
})

export default Component;
</script>