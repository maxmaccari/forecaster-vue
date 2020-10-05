<template>
  <div class="flex ">
    <div><v-icon :file="summary.icon" class="w-8" /></div>
    <div class="ml-2">
      <div class="text-3xl font-bold leading-none sm:text-2xl">
        {{ summary.temperature }}º
      </div>
      <div class="text-lg font-light sm:text-base sm:mt-1">
        {{ summary.time }}
      </div>
      <div class="text-sm text-gray-600 sm:text-xs">
        {{ summary.clouds }}% cloudness
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { NextHoursSummary } from '@/utils/forecast'

export default defineComponent({
  functional: true,
  props: {
    summary: {
      type: NextHoursSummary,
      required: true,
    },
  },
})
</script>
