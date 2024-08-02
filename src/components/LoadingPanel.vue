<template>
  <div class="min-w-64 flex flex-col items-center px-12 py-6 bg-secondary/[0.8]">
    <LoadingSpinner class="block w-16" />
    <span class="text-lg font-light text-primary">Loading...</span>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import LoadingSpinner from './LoadingSpinner.vue'

export default defineComponent({
  name: 'LoadingPanel',
  components: { LoadingSpinner },
})
</script>
