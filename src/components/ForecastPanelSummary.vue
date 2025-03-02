<template>
  <div class="flex ">
    <div><span v-html="summary.icon" class="w-8" /></div>
    <div class="ml-2">
      <div class="text-2xl leading-6 font-bold">
        {{ summary.temperature }}º
      </div>
      <div class="mt-1 text-base leading-6 font-light">
        {{ summary.time }}
      </div>
      <div class="text-xs font-light text-gray-darker">
        {{ summary.clouds }}% cloudness
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { NextHoursSummary } from '@/utils/forecast'

  defineOptions({
    functional: true,
  })

  defineProps({
    summary: {
        type: NextHoursSummary,
        required: true,
      }
  })
</script>
