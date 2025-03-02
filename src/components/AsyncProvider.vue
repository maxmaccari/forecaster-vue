<template>
  <slot :data="data"></slot>
</template>

<script lang="ts" setup>
  import {  ref } from 'vue'

  const props = defineProps({
    provider: {
      type: Function,
      required: true,
    }
  })
  const data = ref(null)

  data.value = await props.provider()
</script>
