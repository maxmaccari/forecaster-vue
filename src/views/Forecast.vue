<template>
  <div class="flex items-center justify-center min-h-screen">
    <AsyncBoundary>
      <AsyncProvider :provider="provider" v-slot="{ data }">
        <ForecastPanel :forecast="data" :location="location" />
      </AsyncProvider>
    </AsyncBoundary>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ForecastPanel from '@/components/ForecastPanel.vue'
import AsyncBoundary from '@/components/AsyncBoundary.vue'
import AsyncProvider from '@/components/AsyncProvider.vue'
import { useForecast } from '@/use/forecast'

export default defineComponent({
  components: { ForecastPanel, AsyncBoundary, AsyncProvider },
  props: {
    location: {
      type: String,
      required: true,
    },
  },
  methods: {
    async provider() {
      return await useForecast(this.location)
    },
  },
})
</script>
