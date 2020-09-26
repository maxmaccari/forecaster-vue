<template>
  <div>Forecast Here</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  async setup() {
    await new Promise((resolve, reject) => {
      setTimeout(() => reject({ message: 'my error' }), 1000)
    })

    return {}
  },
})
</script>
