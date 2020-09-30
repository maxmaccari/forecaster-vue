<template>
  <component :is="icon" />
</template>

<script lang="ts">
import { defineComponent, defineAsyncComponent } from 'vue'

export default defineComponent({
  name: 'v-icon',
  props: {
    file: {
      type: String,
      required: true,
    },
  },
  computed: {
    icon() {
      const file: string = this.file
      return defineAsyncComponent(
        async () =>
          await import(
            /* webpackChunkName: "icons" */
            /* webpackMode: "lazy-once" */
            '@/assets/icons/' + file + '.svg'
          )
      )
    },
  },
})
</script>
