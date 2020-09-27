<template>
  <div>Forecast Here</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ForecastPanel',
  props: {
    forecast: {
      type: Object,
      required: true,
    },
  },
})
</script>
