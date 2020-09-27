<template>
  <slot :data="data"></slot>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
  props: {
    provider: {
      type: Function,
      required: true,
    },
  },
  async setup(props) {
    const data = ref(null)

    data.value = await props.provider()

    return { data }
  },
})
</script>
