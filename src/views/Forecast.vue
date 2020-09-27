<template>
  <div class="flex items-center justify-center min-h-screen">
    <AsyncBoundary>
      <AsyncProvider :provider="provider" v-slot="{ data }">
        <ForecastPanel :forecast="data" />
      </AsyncProvider>
    </AsyncBoundary>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ForecastPanel from '@/components/ForecastPanel.vue'
import AsyncBoundary from '@/components/AsyncBoundary.vue'
import AsyncProvider from '@/components/AsyncProvider.vue'

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
      return new Promise(resolve => {
        setTimeout(() => resolve({ message: 'hello world' }), 1000)
      })
    },
  },
})
</script>
