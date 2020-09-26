<template>
  <div>Error Here</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    error: {
      type: Object,
      required: true,
    },
  },
})
</script>
