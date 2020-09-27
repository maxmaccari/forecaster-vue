<template>
  <div class="flex flex-col items-center px-12 py-3 bg-gray-translucid">
    <LoadingSpinner class="block w-16" />
    <span class="text-2xl text-indigo-900">Loading...</span>
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
