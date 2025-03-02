<template>
  <div :class="`w-full px-2 py-3 mx-4 sm:mx-0 sm:p-6 ${bgColor}`">
    <h2 v-if="$slots.title" :class="`text-3xl font-bold text-center text-primary flex ${titleClasses}`">
      <slot name="title" />
    </h2>

    <VSeparator v-if="$slots.title && separator" class="mt-1" />

    <slot />
  </div>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import VSeparator from './VSeparator.vue';

defineOptions({ functional: true })

const props = defineProps({
  separator: {
    type: Boolean,
    default: true
  },
  titleOrientation: {
    type: String,
    default: 'row'
  },
  bgColor: {
    type: String,
    default: 'bg-secondary/80'
  }
})

const titleClasses = computed(() => {
  if (props.titleOrientation === 'row') {
    return 'flex-row justify-center items-center'
  } else {
    return 'flex-col'
  }
})
</script>