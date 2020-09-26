<template>
  <div>
    <ErrorPanel :error="error" v-if="error" />
    <Suspense v-else>
      <template #default>
        <ForecastPanel :location="location" />
      </template>
      <template #fallback>
        <LoadingPanel />
      </template>
    </Suspense>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import ForecastPanel from '@/components/ForecastPanel.vue'
import ErrorPanel from '@/components/ErrorPanel.vue'
import LoadingPanel from '@/components/LoadingPanel.vue'

export default defineComponent({
  components: { ForecastPanel, ErrorPanel, LoadingPanel },
  props: {
    location: {
      type: String,
      required: true,
    },
  },
  data(): { error: any } {
    return {
      error: null,
    }
  },
  errorCaptured(error) {
    this.error = error

    return true
  },
})
</script>
