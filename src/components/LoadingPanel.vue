<template>
  <VPanel class="max-w-64" :separator="false" title-orientation="column">
    <template #title>
      <VLoadingSpinner class="block w-24 m-auto" />

      <span class="w-full">Loading...</span>
    </template>
  </VPanel>
</template>

<script lang="ts" setup>
  import VLoadingSpinner from './VLoadingSpinner.vue'
  import VPanel from './VPanel.vue';
</script>
