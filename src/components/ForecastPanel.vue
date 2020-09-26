<template>
  <div>Forecast Here</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    location: {
      type: String,
      required: true,
    },
  },
  async setup() {
    await new Promise(resolve => {
      setTimeout(() => resolve({}), 1000)
    })

    return {}
  },
})
</script>
